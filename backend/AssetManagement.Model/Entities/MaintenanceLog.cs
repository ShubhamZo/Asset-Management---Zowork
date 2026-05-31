using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class MaintenanceLog : BaseEntity
    {
        [Key]
        public int LogId { get; set; }
        [Required]
        public int AssetId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Cost { get; set; }
        [Required]
        public DateTime MaintenanceDate { get; set; }
        [Required]
        public string PerformedBy { get; set; }
        public string? Notes { get; set; }

        
        public Asset Asset { get; set; }
    }
}
