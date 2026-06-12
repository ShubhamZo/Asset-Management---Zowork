using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.TicketDto
{
    public class UpdateTicketStatusDTO
    {
        public TicketStatus Status { get; set; }
        public string? ResolutionNote { get; set; }
        public int EmployeeId { get; set; }
    }
}
