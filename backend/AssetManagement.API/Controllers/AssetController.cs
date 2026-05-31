using AssetManagement.Business.Interface;
using AssetManagement.Model.DTO.AssetDto;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var assets = await _assetService.GetAllAssets();
            return Ok(assets);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var asset = await _assetService.GetAssetById(id);
            if (asset == null)
                return NotFound("Asset not found");
            return Ok(asset);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAsset(CreateAssetDTO asset)
        {
            try
            {
                await _assetService.AddAsset(asset);
                return Ok("Asset added successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(int id, [FromBody] UpdateAssetDTO asset)
        {
            await _assetService.UpdateAsset(id, asset);
            return Ok("Asset updated successfully");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _assetService.DeleteAsset(id);
            if (!result)
                return NotFound("Asset not found");
            return Ok("Asset Deleted Successfully");
        }
    }
}
