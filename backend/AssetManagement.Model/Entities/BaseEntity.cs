using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.Entities
{
    public class BaseEntity
    {
        //public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        //public DateTime? DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
