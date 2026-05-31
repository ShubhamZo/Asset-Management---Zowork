using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class Asset : BaseEntity
    {
        [Key]
        public int AssetId { get; set; }
        [Required]
        public string AssetName { get; set; }
        [Required]
        public string AssetType { get; set; }
        [Required]
        public string SerialNumber { get; set; }
        [Required]
        public DateTime PurchaseDate { get; set; }
        [Required]
        public AssetStatus Status { get; set; } = AssetStatus.Active; // Active, Issued, UnderMaintenance, Retired

        public ICollection<AssetAssignment> AssetAssignments { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<MaintenanceLog> MaintenanceLogs { get; set; }
        public ICollection<AssetDocument> Documents { get; set; }
    }
}
