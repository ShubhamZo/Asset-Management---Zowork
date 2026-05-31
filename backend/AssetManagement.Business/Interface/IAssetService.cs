using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.DTO.AssetDto;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface IAssetService
    {
        Task<IEnumerable<AssetResponseDTO>> GetAllAssets();
        Task<AssetResponseDTO> GetAssetById(int id);
        Task AddAsset(CreateAssetDTO dto);
        Task UpdateAsset(int id, UpdateAssetDTO dto);
        Task<bool> DeleteAsset(int id);
    }
}


