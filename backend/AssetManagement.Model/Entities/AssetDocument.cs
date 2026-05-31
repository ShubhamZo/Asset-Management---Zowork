using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class AssetDocument : BaseEntity
    {
        [Key]
        public int DocumentId { get; set; }
        [Required]
        public int AssetId { get; set; }
        [Required]
        public string FileName { get; set; }
        [Required]
        public string FilePath { get; set; }
        [Required]
        public DateTime UploadedDate { get; set; } = DateTime.Now;
        public Asset Asset { get; set; }
    }
}
