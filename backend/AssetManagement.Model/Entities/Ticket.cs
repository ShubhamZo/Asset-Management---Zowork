using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class Ticket : BaseEntity
    {
        [Key]
        public int TicketId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public TicketStatus Status { get; set; } 
        //public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? ResolvedDate { get; set; }
        [Required]
        public int AssetId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        public int? AssignedEmployeeId { get; set; }
        public Employee AssignedEmployee { get; set; }
        public Asset Asset { get; set; }
        public Employee Employee { get; set; }
    }
}
