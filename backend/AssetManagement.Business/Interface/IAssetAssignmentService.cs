using AssetManagement.Model.DTO.AssetAssignDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Interface
{
    public interface IAssetAssignmentService
    {
        Task<IEnumerable<AssetAssignmentResponseDTO>> GetAllAssignments();
        Task AssignAsset(CreateAssetAssignmentDTO dto);
        Task ReturnAsset(int assignmentId, UpdateAssetAssignmentDTO dto);
        Task<IEnumerable<AssetAssignmentResponseDTO>> GetAssignmentsByEmployee(int employeeId);
        Task<IEnumerable<AssetAssignmentHistoryDTO>> GetAssetHistory(int assetId);
    }
}
