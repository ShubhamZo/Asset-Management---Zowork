using AssetManagement.Model.DTO.AssetDocumentDto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface IAssetDocumentService
    {
        Task UploadDocumentsAsync(int AssetId, List<IFormFile> files);
        Task<IEnumerable<AssetDocumentDTO>> GetDocumentsByAssetId(int assetId);
        Task DeleteDocument(int documentId);
    }
}
