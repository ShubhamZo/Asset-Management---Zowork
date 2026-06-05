using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Model.Entities;
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
    }
}
