using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using Microsoft.EntityFrameworkCore;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Repositories
{
    public class AssetDocumentRepository : IAssetDocumentRepository
    {
        public readonly AppDbContext _context;
        public AssetDocumentRepository(AppDbContext context) 
        {
            _context = context;
        }
        public async Task AddDocumentAsync(Model.Entities.AssetDocument asset)
        {
            await _context.AssetDocuments.AddAsync(asset);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<AssetDocument>> GetByAssetIdAsync(int assetId)
        {
            return await _context.AssetDocuments
                .Where(d => d.AssetId == assetId && !d.IsDeleted)
                .OrderByDescending(x => x.UploadedDate)
                .ToListAsync();
        }
        public async Task SoftDeleteDocumentAsync(int documentID)
        {
            var document = await _context.AssetDocuments.FindAsync(documentID);
            if (document != null)
            {
                document.IsDeleted = true;
                document.UpdatedAt = DateTime.UtcNow;
                _context.AssetDocuments.Update(document);
                await _context.SaveChangesAsync();
            }
        }
    }
}
