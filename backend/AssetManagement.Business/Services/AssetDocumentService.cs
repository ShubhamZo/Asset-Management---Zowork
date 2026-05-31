using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Model.DTO.AssetDocumentDto;
using AssetManagement.Model.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Business.Services
{
    public class AssetDocumentService : IAssetDocumentService
    {
        private readonly IAssetDocumentRepository _assetDocumentRepository;
        private readonly IRepository<AssetDocument> _repositoryDocument; 
        private readonly IWebHostEnvironment _environment;
        public AssetDocumentService(IAssetDocumentRepository assetDocumentRepository, IWebHostEnvironment environment, IRepository<AssetDocument> repositoryDocument)
        {
            _assetDocumentRepository = assetDocumentRepository;
            _environment = environment;
            _repositoryDocument = repositoryDocument;
        }
        public async Task UploadDocumentsAsync(int AssetId, List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                throw new Exception("No Files Selected");
            string uploadFolder = Path.Combine(_environment.WebRootPath, "uploads", "assets");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }
            foreach (var file in files)
            {
                if (file.Length <= 0)
                {
                    throw new Exception($"File {file.FileName} is empty.");
                }
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                string filePath = Path.Combine(uploadFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                AssetDocument document = new AssetDocument
                {
                    AssetId = AssetId,
                    FileName = file.FileName,
                    FilePath = "/uploads/assets/" + uniqueFileName,
                    UploadedDate = DateTime.Now
                };
                await _assetDocumentRepository.AddDocumentAsync(document);
            }
        }
        public async Task<IEnumerable<AssetDocumentDTO>> GetDocumentsByAssetId(int assetId)
        {
            var documents = await _assetDocumentRepository.GetByAssetIdAsync(assetId);
            return documents.Select(x => new AssetDocumentDTO
            {
                DocumentId = x.DocumentId,
                FileName = x.FileName,
                FilePath = x.FilePath,
                UploadedDate = x.UploadedDate
            });
        }
        public async Task DeleteDocument(int documentId)
        {

            await _assetDocumentRepository.SoftDeleteDocumentAsync(documentId);
            await _repositoryDocument.SaveAsync();
        }
    }
}

