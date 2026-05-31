using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class CreateAssetAssignmentDTO
    {
        public int AssetId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime? ExpectedReturnDate { get; set; }
        public string? ConditionAtIssue { get; set; }
    }
}
