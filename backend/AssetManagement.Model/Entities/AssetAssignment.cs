using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class AssetAssignment : BaseEntity
    {
        [Key]
        public int AssignmentId { get; set; }
        [Required]
        public int AssetId { get; set; }
        public int? EmployeeId { get; set; } 
        public DateTime? AssignedDate { get; set; }
        public DateTime? ExpectedReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }
        public string? ConditionAtIssue { get; set; }
        public string? ConditionAtReturn { get; set; }
        public Asset Asset { get; set; }
        public Employee Employee { get; set; }
    }
}
