using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetDocumentDto
{
    public class UploadAssetDocumentDTO
    {
        public int AssetId { get; set; }
        public List<IFormFile> Files { get; set; }
    }
}
