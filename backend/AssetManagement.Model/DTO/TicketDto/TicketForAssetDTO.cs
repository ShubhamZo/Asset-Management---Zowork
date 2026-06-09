using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.TicketDto
{
    public class TicketForAssetDto
    {
        public int TicketId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
