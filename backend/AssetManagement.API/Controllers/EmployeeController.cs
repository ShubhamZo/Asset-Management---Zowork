using AssetManagement.Business.Interface;
using AssetManagement.Business.Services;
using AssetManagement.Model.DTO.EmployeeDto;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        public readonly IEmployeeService _empService;
        public EmployeeController(IEmployeeService empService)
        {
            _empService = empService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _empService.GetAllEmployees();
            return Ok(employees);
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] CreateEmployeeDTO dto)
        {
            await _empService.AddEmployee(dto);
            return Ok("Employee added successfully");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _empService.GetEmployeeById(id);
            if (employee == null)
                return NotFound("Employee not found");
            return Ok(employee);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] CreateEmployeeDTO dto)
        {
            await _empService.UpdateEmployee(id, dto);
            return Ok("Employee updated successfully");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var result = await _empService.DeleteEmployee(id);
            if(!result)
                return NotFound("Employee not found");
            return Ok("Employee Deleted Successfully");
        }
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableEmployees()
        {
            var employees = await _empService.GetAvailableEmployees();
            return Ok(employees);
        }
    }
}
