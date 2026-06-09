using AssetManagement.Model.DTO.TicketDto;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync();
        Task<List<Ticket>> GetTicketsByAssetId(int assetId);
        Task<IEnumerable<Ticket>> GetTicketsAsync();
        Task<Ticket> AssignTicketAsync( int ticketId, int employeeId);
    }
}
