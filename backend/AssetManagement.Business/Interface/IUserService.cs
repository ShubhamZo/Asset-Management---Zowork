using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.DTO.LoginDto;
using AssetManagement.Model.DTO.UserDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface IUserService
    {
        Task CreateUserAsync(CreateUserDTO dto);
        Task<LoginResponseDTO> Login(LoginDTO loginDto);
        
    }
}
