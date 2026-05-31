using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class AssetAssignmentResponseDTO
    {
        public int AssignmentId { get; set; }
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ExpectedReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public string? ConditionAtIssue { get; set; }
        public string? ConditionAtReturn { get; set; }
        public string SerialNumber { get; set; }
    }
}
