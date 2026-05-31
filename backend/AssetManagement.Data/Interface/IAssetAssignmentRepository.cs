using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{
    public interface IAssetAssignmentRepository : IRepository<AssetAssignment>
    {
        Task<IEnumerable<AssetAssignment>> GetAllAssignments();
        Task<IEnumerable<AssetAssignment>> GetAssignmentsByEmployee(int employeeId);
        Task<IEnumerable<AssetAssignmentHistoryDTO>> GetAssetHistory(int assetId);
    }
}
