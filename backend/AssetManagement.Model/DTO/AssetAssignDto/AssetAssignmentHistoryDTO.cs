using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class AssetAssignmentHistoryDTO
    {
        public string EmployeeName { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string ReturnCondition { get; set; }
    }
}
