using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Data.Repositories;
using AssetManagement.Model.DTO.AssetAssignDto;
using AssetManagement.Model.Entities;
using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class AssetAssignmentService : IAssetAssignmentService
    {
        public readonly IAssetAssignmentRepository _assignmentRepo;
        public readonly IAssetRepository _assetRepo;
        public AssetAssignmentService( IAssetAssignmentRepository assignmentRepo, IAssetRepository assetRepo)
        {
            _assignmentRepo = assignmentRepo;
            _assetRepo = assetRepo;
        }

        public async Task<IEnumerable<AssetAssignmentResponseDTO>> GetAllAssignments()
        {
            var assignments = await _assignmentRepo.GetAllAssignments();

            return assignments.Select(a => new AssetAssignmentResponseDTO
            {
                AssignmentId = a.AssignmentId,

                AssetId = a.AssetId,
                AssetName = a.Asset.AssetName,

                EmployeeId = a.EmployeeId,
                EmployeeName = a.Employee != null ? a.Employee.FirstName + " " + a.Employee.LastName: null,

                AssignedDate = a.AssignedDate,
                ExpectedReturnDate = a.ExpectedReturnDate,
                ActualReturnDate = a.ActualReturnDate,

                ConditionAtIssue = a.ConditionAtIssue,
                ConditionAtReturn = a.ConditionAtReturn,

                SerialNumber = a.Asset.SerialNumber
            });
        }

        public async Task AssignAsset(CreateAssetAssignmentDTO dto)
        {
            var asset = await _assetRepo.GetByIdAsync(dto.AssetId);

            if (asset == null)
                throw new Exception("Asset not found");

            if (asset.Status != AssetStatus.Active)
                throw new Exception("Only Active Asset can be assigned");

            var assignment = new AssetAssignment
            {
                AssetId = dto.AssetId,
                EmployeeId = dto.EmployeeId,

                AssignedDate = dto.AssignedDate,
                ExpectedReturnDate = dto.ExpectedReturnDate,

                ConditionAtIssue = dto.ConditionAtIssue
            };

            asset.Status = AssetStatus.Issued;
            await _assignmentRepo.AddAsync(assignment);
            _assetRepo.Update(asset);
            await _assignmentRepo.SaveAsync();
        }
        public async Task ReturnAsset(int assignmentId, UpdateAssetAssignmentDTO dto)
        {
            var assignment = await _assignmentRepo.GetByIdAsync(assignmentId);
            if (assignment == null)
                throw new Exception("Assignment not found");
            assignment.ActualReturnDate = dto.ActualReturnDate;
            assignment.ConditionAtReturn = dto.ConditionAtReturn;
            var asset = await _assetRepo.GetByIdAsync(assignment.AssetId);
            asset.Status = AssetStatus.Active;
            _assignmentRepo.Update(assignment);
            _assetRepo.Update(asset);
            await _assignmentRepo.SaveAsync();
        }
        public async Task<IEnumerable<AssetAssignmentResponseDTO>>GetAssignmentsByEmployee(int employeeId)
        {
            var assignments =
                await _assignmentRepo.GetAssignmentsByEmployee(employeeId);

            return assignments.Select(a => new AssetAssignmentResponseDTO
            {
                AssignmentId = a.AssignmentId,

                AssetId = a.AssetId,
                AssetName = a.Asset.AssetName,

                EmployeeId = a.EmployeeId,
                EmployeeName = a.Employee.FirstName + " " + a.Employee.LastName,

                AssignedDate = a.AssignedDate,
                ExpectedReturnDate = a.ExpectedReturnDate,
                ActualReturnDate = a.ActualReturnDate,

                ConditionAtIssue = a.ConditionAtIssue,
                ConditionAtReturn = a.ConditionAtReturn,

                SerialNumber = a.Asset.SerialNumber
            });
        }
        public async Task<IEnumerable<AssetAssignmentHistoryDTO>> GetAssetHistory(int assetId)
        {
            return await _assignmentRepo.GetAssetHistory(assetId);
        }
        public async Task<IEnumerable<EmployeeCurrentAssetDTO>> GetCurrentAssetsByEmployee(int employeeId)
        {
            var currentAssignments = await _assignmentRepo.GetCurrentAssignmentByEmployee(employeeId);
            return currentAssignments.Select(a => new EmployeeCurrentAssetDTO
            {
                AssignmentId = a.AssignmentId,
                AssetId = a.AssetId,
                AssetName = a.Asset.AssetName,
                AssetType = a.Asset.AssetType,
                SerialNumber = a.Asset.SerialNumber,
                AssignedDate = a.AssignedDate,
                ExpectedReturnDate = a.ExpectedReturnDate,
                ConditionAtIssue = a.ConditionAtIssue
            });
        }
        public async Task ReturnAsset(ReturnAssetDTO dto)
        {
            await _assignmentRepo.ReturnAsset(dto);
        }
    }
}
