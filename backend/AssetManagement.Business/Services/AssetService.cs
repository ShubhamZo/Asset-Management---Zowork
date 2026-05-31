using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Data.Repositories;
using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.DTO.AssetDto;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Entities;
using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepo;
        public AssetService(IAssetRepository assetRepo)
        {
            _assetRepo = assetRepo;
        }
        public async Task<IEnumerable<AssetResponseDTO>> GetAllAssets()
        {
            var assets = await _assetRepo.GetAllAsync();
            return assets.Select(ast => new AssetResponseDTO
            {
                AssetId = ast.AssetId,
                AssetName = ast.AssetName,
                AssetType = ast.AssetType,
                SerialNumber = ast.SerialNumber,
                Status = (AssetStatus)ast.Status,
                PurchaseDate = ast.PurchaseDate
            });
        }
        public async Task<AssetResponseDTO> GetAssetById(int id)
        {
            var asset = await _assetRepo.GetByIdAsync(id);
            if (asset == null)
                return null;
            return new AssetResponseDTO
            {
                AssetId = asset.AssetId,
                AssetName = asset.AssetName,
                AssetType = asset.AssetType,
                SerialNumber = asset.SerialNumber,
                Status = (AssetStatus)asset.Status,
                PurchaseDate = asset.PurchaseDate
            };
        }
        public async Task AddAsset(CreateAssetDTO dto)
        {
            var existingAsset = await _assetRepo.GetBySerialNumber(dto.SerialNumber);
            if (existingAsset != null)
            {
                throw new Exception("Serial Number already exists");
            }
            var asset = new Asset
            {
                AssetName = dto.AssetName,
                AssetType = dto.AssetType,
                SerialNumber = dto.SerialNumber,
                PurchaseDate = dto.PurchaseDate,
                Status = dto.Status
            };
            await _assetRepo.AddAsync(asset);
            await _assetRepo.SaveAsync();
        }
        public async Task UpdateAsset(int id, UpdateAssetDTO dto)
        {
            var asset = await _assetRepo.GetByIdAsync(id);
            if (asset == null)
                throw new Exception("Asset not found");
            if (asset.Status == AssetStatus.Retired || asset.Status == AssetStatus.Issued)
                throw new Exception("Cannot update an asset that is issued or retired");

            asset.AssetName = dto.AssetName;
            asset.AssetType = dto.AssetType;
            asset.SerialNumber = dto.SerialNumber;
            asset.Status = dto.Status;
            asset.PurchaseDate = dto.PurchaseDate;
            asset.UpdatedAt = DateTime.UtcNow;

            _assetRepo.Update(asset);
            await _assetRepo.SaveAsync();
        }
        public async Task<bool> DeleteAsset(int id)
        {
            var asset = await _assetRepo.GetByIdAsync(id);
            if (asset == null)
                return false;
            if (asset.Status == AssetStatus.Issued)
                return false;
            await _assetRepo.SoftDeleteAsync(id);
            await _assetRepo.SaveAsync();
            return true;
        }
    }
}
