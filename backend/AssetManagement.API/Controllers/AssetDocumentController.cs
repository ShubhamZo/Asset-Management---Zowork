using AssetManagement.Business.Interface;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetDocumentController : ControllerBase
    {
        private readonly IAssetDocumentService _assetDocumentService;
        public AssetDocumentController(IAssetDocumentService assetDocumentService)
        {
            _assetDocumentService = assetDocumentService;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocuments(int AssetId, List<IFormFile> files)
        {
            try
            {
                await _assetDocumentService.UploadDocumentsAsync(AssetId, files);
                return Ok("Documents uploaded successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("asset/{assetId}")]
        public async Task<IActionResult> GetDocument(int assetId)
        {
            var docs = await _assetDocumentService.GetDocumentsByAssetId(assetId);
            return Ok(docs);
        }
        [HttpDelete("{documentId}")]
        public async Task<IActionResult> DeleteDocument(int documentId)
        {
            await _assetDocumentService.DeleteDocument(documentId);
            return Ok("Document deleted successfully");
        }
    }
}
