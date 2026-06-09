using AssetManagement.Model.DTO.EmployeeDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDTO>> GetAllEmployees();
        Task<EmployeeDTO> GetEmployeeById(int id);
        Task AddEmployee(CreateEmployeeDTO dto);
        Task UpdateEmployee(int id, CreateEmployeeDTO dto);
        Task<bool> DeleteEmployee(int id);
        Task<IEnumerable<EmployeeDTO>> GetAvailableEmployees();
        Task<IEnumerable<EmployeeDropdownDTO>> GetITEmployees();
    }
}
