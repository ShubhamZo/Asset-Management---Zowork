using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.Model.DTO.TicketDto
{
    public class CreateTicketDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int AssetId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
    }
}
