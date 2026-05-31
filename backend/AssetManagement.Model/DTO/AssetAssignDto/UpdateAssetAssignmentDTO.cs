using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class UpdateAssetAssignmentDTO
    {
        public DateTime? ActualReturnDate { get; set; }
        public string? ConditionAtReturn { get; set; }
    }
}
