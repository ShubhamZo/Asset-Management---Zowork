using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Model.Entities;
using AssetManagement.Model.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Repositories
{
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(AppDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync()
        {
            return await _context.Tickets.Include(t => t.Asset).ThenInclude(a => a.AssetAssignments).ToListAsync();
        }
        public async Task<List<Ticket>> GetTicketsByAssetId(int assetId)
        {
            return await _context.Tickets
                .Include(t => t.Employee)
                .Where(t => t.AssetId == assetId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }
        public async Task<IEnumerable<Ticket>> GetTicketsAsync()
        {
            return await _context.Tickets
                .Include(t => t.Asset)
                .Include(t => t.Employee)
                .Include(t => t.AssignedEmployee)
                .ThenInclude(a => a.AssetAssignments)
                .ToListAsync();
        }
        public async Task<Ticket> AssignTicketAsync(int ticketId, int employeeId)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket == null) return null;

            ticket.AssignedEmployeeId = employeeId;
            if(ticket.Status == TicketStatus.Open)
            {
                ticket.Status = TicketStatus.InProgress;
            }
            await _context.SaveChangesAsync();
            return ticket;
        }
    }
}
