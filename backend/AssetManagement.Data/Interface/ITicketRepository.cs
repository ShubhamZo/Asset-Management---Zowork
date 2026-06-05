using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync();
    }
}
