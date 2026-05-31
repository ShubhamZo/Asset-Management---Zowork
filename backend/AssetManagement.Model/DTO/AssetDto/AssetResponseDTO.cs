using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetDto
{
    public class AssetResponseDTO
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetType { get; set; }
        public string SerialNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public AssetStatus Status { get; set; }
    }
}