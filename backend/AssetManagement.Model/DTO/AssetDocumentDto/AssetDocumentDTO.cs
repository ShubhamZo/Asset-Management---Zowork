using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.AssetDocumentDto
{
   public class AssetDocumentDTO
    {
        public int DocumentId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadedDate { get; set; }
    }
}
