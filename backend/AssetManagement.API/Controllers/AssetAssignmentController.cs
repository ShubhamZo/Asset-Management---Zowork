using AssetManagement.Business.Interface;
using AssetManagement.Business.Services;
using AssetManagement.Model.DTO.AssetAssignDto;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetAssignmentController : ControllerBase
    {
        private readonly IAssetAssignmentService _service;

        public AssetAssignmentController(IAssetAssignmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssignments()
        {
            var result = await _service.GetAllAssignments();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AssignAsset(CreateAssetAssignmentDTO dto)
        {
            await _service.AssignAsset(dto);
            return Ok("Asset Assigned Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ReturnAsset(int id,UpdateAssetAssignmentDTO dto)
        {
            await _service.ReturnAsset(id, dto);
            return Ok("Asset Returned Successfully");
        }
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetAssignmentsByEmployee(int employeeId)
        {
            var result = await _service.GetAssignmentsByEmployee(employeeId);
            return Ok(result);
        }
        [HttpGet("history/{assetId}")]
        public async Task<IActionResult> GetAssetHistory(int assetId)
        {
            var history = await _service.GetAssetHistory(assetId);

            return Ok(history);
        }
        [HttpGet("current-assets/{employeeId}")]
        public async Task<IActionResult> GetCurrentAssets(int employeeId)
        {
            var assets = await _service.GetCurrentAssetsByEmployee(employeeId);
            return Ok(assets);
        }
        [HttpPut("return")]
        public async Task<IActionResult> ReturnAsset(ReturnAssetDTO dto)
        {
            await _service.ReturnAsset(dto);
            return Ok();
        }
    }
}
