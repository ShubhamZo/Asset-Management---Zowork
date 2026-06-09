using AssetManagement.Business.Interface;
using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Data.Repositories;
using AssetManagement.Model.DTO.EmployeeDto;
using AssetManagement.Model.Entities;
using AssetManagement.Model.Enum;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        public readonly IRepository<Employee> _EmpRepo;
        public readonly IUserRepository _UserRepo;
        private readonly IAssetAssignmentRepository _assignmentRepo;
        private readonly AppDbContext _context;

        public EmployeeService(IRepository<Employee> empRepo, IUserRepository userRepo, IAssetAssignmentRepository assetAssignmentRepository, AppDbContext context)
        {
            _EmpRepo = empRepo;
            _UserRepo = userRepo;
            _assignmentRepo = assetAssignmentRepository;
            _context = context;
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
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var employee = await _context.Employees
                    .Include(e => e.User)
                    .FirstOrDefaultAsync(e => e.EmployeeId == id && !e.IsDeleted);
                if (employee == null)
                    throw new Exception("Employee not found");
                var activeAssignments = await _assignmentRepo.GetCurrentAssignmentByEmployee(id);
                foreach (var assignment in activeAssignments)
                {
                    assignment.ActualReturnDate = DateTime.UtcNow;
                    assignment.ConditionAtReturn = "Returned automatically during employee deletion";
                    assignment.Asset.Status = AssetStatus.Active;
                    _context.AssetAssignments.Update(assignment);
                }
                if (employee.User != null)
                {
                    employee.User.IsDeleted = true;
                    employee.User.UpdatedAt = DateTime.UtcNow;

                    _context.Users.Update(employee.User);
                }
                employee.IsDeleted = true;
                employee.UpdatedAt = DateTime.UtcNow;

                _context.Employees.Update(employee);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return true;
            }
            catch 
            {
                await transaction.RollbackAsync();
                throw;
            }
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
        public async Task<IEnumerable<EmployeeDropdownDTO>> GetITEmployees()
        {
            var employees = await _EmpRepo.GetAllAsync();
            return employees
                .Where(emp => emp.Department == Department.IT)
                .Select(emp => new EmployeeDropdownDTO
                {
                    EmployeeId = emp.EmployeeId,
                    Name = $"{emp.FirstName} {emp.LastName}"
                });
        }
    }
}
