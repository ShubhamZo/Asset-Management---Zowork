using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{
    public interface IAssetRepository : IRepository<Asset>
    {
        Task<Asset> GetBySerialNumber(string serialNumber);
    }
}
