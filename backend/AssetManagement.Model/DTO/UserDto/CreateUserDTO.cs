using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.UserDto
{
    public class CreateUserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public int? EmployeeId { get; set; }
    }
}
