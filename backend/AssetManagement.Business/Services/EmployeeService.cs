using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Data.Repositories;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        public readonly IRepository<Employee> _EmpRepo;
        public readonly IUserRepository _UserRepo;

        public EmployeeService(IRepository<Employee> empRepo, IUserRepository userRepo )
        {
            _EmpRepo = empRepo;
            _UserRepo = userRepo;
        }
        public async Task<IEnumerable<EmployeeDTO>> GetAllEmployees()
        {
            var employees = await _EmpRepo.GetAllAsync();
            return employees.Select(e => new EmployeeDTO
            {
                EmployeeId = e.EmployeeId,
                FirstName = e.FirstName,
                LastName = e.LastName,
                email = e.Email,
                Department = e.Department
            });
        }
        public async Task AddEmployee(CreateEmployeeDTO dto)
        {
            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Department = dto.Department
            };
            await _EmpRepo.AddAsync(employee);
            await _EmpRepo.SaveAsync();
        }
        public async Task<EmployeeDTO> GetEmployeeById(int id)
        {
            var employee = await _EmpRepo.GetByIdAsync(id);
            if (employee == null)
                return null;
            return new EmployeeDTO
            {
                EmployeeId = employee.EmployeeId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                email = employee.Email,
                Department = employee.Department
            };
        }
        public async Task UpdateEmployee(int id, CreateEmployeeDTO dto)
        {
            var employee = await _EmpRepo.GetByIdAsync(id);
            if (employee == null)
                throw new Exception("Employee not found");
            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Email = dto.Email;
            employee.Department = dto.Department;
            employee.UpdatedAt = DateTime.UtcNow;

            _EmpRepo.Update(employee);
            await _EmpRepo.SaveAsync();
        }
        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _EmpRepo.GetByIdAsync(id);
            if (employee == null)
                return false;
            await _EmpRepo.SoftDeleteAsync(id);
            await _EmpRepo.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<EmployeeDTO>> GetAvailableEmployees()
        {
            var employees = await _EmpRepo.GetAllAsync();

            var assignedEmployeeIds =
                await _UserRepo.GetAssignedEmployeeIdsAsync();

            var availableEmployees = employees
                .Where(emp =>
                    !assignedEmployeeIds.Contains(emp.EmployeeId)
                );

            return availableEmployees.Select(emp => new EmployeeDTO
            {
                EmployeeId = emp.EmployeeId,
                FirstName = emp.FirstName,
                LastName = emp.LastName,
                Department = emp.Department
            });
        }
    }
}
