using AssetManagement.Business.Interface;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.DTO.LoginDto;
using AssetManagement.Model.DTO.UserDto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(CreateUserDTO dto)
        {
            try
            {
                await _userService.CreateUserAsync(dto);
                return Ok(new { message = "User added successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO request)
        {
            var response = await _userService.Login(request);
            if (response == null)
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok(response);
        }
    }
}
