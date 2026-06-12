using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.TicketDto
{
    public class TicketResponseDto
    {
        public int TicketId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string SerialNumber { get; set; }
        public bool IsAssetCurrentlyAssigned { get; set; }
        public int? AssignedEmployeeId { get; set; }
        public int EmployeeId { get; set; }
        public string AssignedEmployeeName { get; set; }
        public string ResolutionNote { get; set; }
        public DateTime? ResolvedDate { get; set; }

        public DateTime? LastUpdatedAt { get; set; }

    }
}
