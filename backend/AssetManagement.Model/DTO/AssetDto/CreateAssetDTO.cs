using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetDto
{
    public class CreateAssetDTO
    {
        public string AssetName { get; set; }
        public string AssetType { get; set; }
        public string SerialNumber { get; set; }
        public AssetStatus Status { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
