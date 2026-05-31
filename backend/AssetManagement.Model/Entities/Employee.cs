using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class Employee : BaseEntity
    {
        [Key]
        public int EmployeeId { get; set; }
        //public int EmpId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public Department Department { get; set; }
        [Required]
        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        public User User { get; set; }
        public ICollection<AssetAssignment> AssetAssignments { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
