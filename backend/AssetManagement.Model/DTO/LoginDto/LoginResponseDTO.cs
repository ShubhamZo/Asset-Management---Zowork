using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Model.DTO.LoginDto
{
    public class LoginResponseDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public int? EmployeeId { get; set; }
    }
}
