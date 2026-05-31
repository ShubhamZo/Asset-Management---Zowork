using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Model.DTO.LoginDto;
using AssetManagement.Model.DTO.UserDto;
using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class UserService : IUserService
    {
        public readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<LoginResponseDTO> Login(LoginDTO loginDto)
        {
            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);
            if (user == null || user.Password != loginDto.Password)
            {
                return null;
            }
            return new LoginResponseDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role.ToString(),
                EmployeeId = user.EmployeeId
            };
        }
        public async Task CreateUserAsync(CreateUserDTO dto)
        {
            var existingUser = await _userRepository.GetByUsernameAsync(dto.Username);
            if (existingUser != null)
            {
                throw new Exception("Username already exists");
            }

            if (dto.Role == UserRole.Employee && dto.EmployeeId == null)
            {
                throw new Exception("Employee user must have EmployeeId");
            }

            if (dto.Role == UserRole.Admin)
            {
                dto.EmployeeId = null;
            }

            if (dto.EmployeeId != null)
            {
                var allUsers = await _userRepository.GetAllAsync();
                if (allUsers.Any(u => u.EmployeeId == dto.EmployeeId && !u.IsDeleted))
                {
                    throw new Exception("User already exists for this employee");
                }
            }

            var user = new Model.Entities.User
            {
                Username = dto.Username,
                Password = dto.Password,
                Role = (UserRole)dto.Role,
                EmployeeId = dto.EmployeeId
            };
            await _userRepository.AddAsync(user);
            await _userRepository.SaveAsync();
        }
    }
}
