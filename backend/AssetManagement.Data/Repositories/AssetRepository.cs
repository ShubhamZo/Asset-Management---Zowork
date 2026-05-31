using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Repositories
{
    public class AssetRepository : Repository<Asset>, IAssetRepository
    {
        public readonly AppDbContext _context;
        public AssetRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Asset> GetBySerialNumber(string serialNumber)
        {
            return await _context.Assets.FirstOrDefaultAsync(a => a.SerialNumber == serialNumber);
        }

    }
}
