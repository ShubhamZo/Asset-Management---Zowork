using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Repositories
{
    public class AssetAssignmentRepository : Repository<AssetAssignment>, IAssetAssignmentRepository
    {
        public AssetAssignmentRepository(AppDbContext context) : base(context)
        { }
        public async Task<IEnumerable<AssetAssignment>> GetAllAssignments()
        {
            return await _context.AssetAssignments
                .Include(a => a.Asset)
                .Include(a => a.Employee)
                .ToListAsync();
        }
        public async Task<IEnumerable<AssetAssignment>> GetAssignmentsByEmployee(int employeeId)
        {
            return await _context.AssetAssignments
                .Include(a => a.Asset)
                .Include(a => a.Employee)
                .Where(a => a.EmployeeId == employeeId)
                .ToListAsync();
        }
        public async Task<IEnumerable<AssetAssignmentHistoryDTO>> GetAssetHistory(int assetId)
        {
            return await _context.AssetAssignments
                    .Where(a => a.AssetId == assetId)
                    .Select(a => new AssetAssignmentHistoryDTO
                    {
                        EmployeeName = a.Employee.FirstName + " " + a.Employee.LastName,
                        AssignedDate = a.AssignedDate,
                        ReturnDate = a.ActualReturnDate,
                        ReturnCondition = a.ConditionAtReturn
                    })
                    .ToListAsync();
        }
    }
}
