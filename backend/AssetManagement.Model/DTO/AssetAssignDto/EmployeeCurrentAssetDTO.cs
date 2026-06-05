using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class EmployeeCurrentAssetDTO
    {
        public int AssignmentId { get; set; }
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetType { get; set; }
        public string SerialNumber { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ExpectedReturnDate { get; set; }
        public string ConditionAtIssue { get; set; }
    }
}
