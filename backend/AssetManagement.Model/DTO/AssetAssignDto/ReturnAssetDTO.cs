using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetAssignDto
{
    public class ReturnAssetDTO
    {
        public int AssignmentId { get; set; }
        public string? ConditionAtReturn { get; set; }
    }
}
