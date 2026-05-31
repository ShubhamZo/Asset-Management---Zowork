using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{
    public interface IAssetDocumentRepository 
    {
        Task AddDocumentAsync(AssetDocument asset);
        Task<IEnumerable<AssetDocument>> GetByAssetIdAsync(int assetId);
        Task SoftDeleteDocumentAsync(int documentId);
    }
}
