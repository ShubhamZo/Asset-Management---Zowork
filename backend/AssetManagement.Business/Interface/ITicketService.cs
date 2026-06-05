using AssetManagement.Model.DTO.TicketDto;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface ITicketService
    {
        Task RaiseTicket(CreateTicketDto dto);
        Task<int> GetOpenTicketCount(int employeeId);
        Task<int> GetTotalTicketCountById(int employeeId);
        Task<IEnumerable<TicketResponseDto>> GetTicketsByEmployee(int employeeId);
    }
}
