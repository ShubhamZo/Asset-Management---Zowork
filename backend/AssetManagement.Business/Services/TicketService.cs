using AssetManagement.Business.Interface;
using AssetManagement.Data.Interface;
using AssetManagement.Model.DTO.TicketDto;
using AssetManagement.Model.Entities;
using AssetManagement.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Business.Services
{
    public class TicketService : ITicketService
    {
        private readonly IRepository<Ticket> _ticketRepo;
        private readonly IRepository<Asset> _assetRepo;
        private readonly IRepository<Employee> _employeeRepo;
        private readonly ITicketRepository _ticketRepository;
        public TicketService(IRepository<Ticket> ticketRepo, IRepository<Asset> assetRepo, IRepository<Employee> employeeRepo, ITicketRepository ticketRepository)
        {
            _ticketRepo = ticketRepo;
            _assetRepo = assetRepo;
            _employeeRepo = employeeRepo;
            _ticketRepository = ticketRepository;
        }
        public async Task RaiseTicket(CreateTicketDto dto)
        {
            var asset = await _assetRepo.GetByIdAsync(dto.AssetId);
            if (asset == null)
            {
                throw new ArgumentException("Asset not found");
            }
            var employee = await _employeeRepo.GetByIdAsync(dto.EmployeeId);
            if (employee == null)
            {
                throw new ArgumentException("Employee not found");
            }
            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                AssetId = dto.AssetId,
                EmployeeId = dto.EmployeeId,
                Status = TicketStatus.Open,
                CreatedAt = DateTime.UtcNow
            };
            await _ticketRepo.AddAsync(ticket);
            await _ticketRepo.SaveAsync();
        }
        public async Task<int> GetOpenTicketCount(int employeeId)
        {
            var tickets = await _ticketRepo.GetAllAsync();
            return tickets.Count(t => t.EmployeeId == employeeId && t.Status == TicketStatus.Open);
        }
        public async Task<int> GetTotalTicketCountById(int employeeId)
        {
            var tickets = await _ticketRepo.GetAllAsync();
            return tickets.Count(t => t.EmployeeId == employeeId);
        }
        public async Task<IEnumerable<TicketResponseDto>> GetTicketsByEmployee(int employeeId)
        {
            var tickets = await _ticketRepository.GetAllTicketsAsync();

            return tickets.Where(t => t.EmployeeId == employeeId)
                .Select(t => new TicketResponseDto
                {
                    TicketId = t.TicketId,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt,
                    AssetId = t.AssetId,
                    AssetName = t.Asset?.AssetName ?? "Unknown Asset",
                    SerialNumber = t.Asset?.SerialNumber ?? "-",
                    IsAssetCurrentlyAssigned = t.Asset?.AssetAssignments?.Any(a =>
                        a.EmployeeId == employeeId &&
                        a.ActualReturnDate == null
                        ) ?? false
                }).OrderByDescending(t => t.CreatedAt);
        }
        public async Task<List<TicketForAssetDto>> GetTicketsByAssetId(int assetId)
        {
            var tickets = await _ticketRepository.GetTicketsByAssetId(assetId);
            return tickets.Select(t => new TicketForAssetDto
            {
                TicketId = t.TicketId,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status.ToString(),
                EmployeeId = t.EmployeeId,
                EmployeeName = t.Employee?.FirstName + " " + t.Employee?.LastName,
                CreatedAt = t.CreatedAt
            }).ToList();
        }
        public async Task<IEnumerable<TicketResponseDto>> GetAllTickets()
        {
            var tickets = await _ticketRepository.GetTicketsAsync();
            return tickets.Select(t => new TicketResponseDto
            {
                TicketId = t.TicketId,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status.ToString(),
                CreatedAt = t.CreatedAt,
                AssetId = t.AssetId,
                AssetName = t.Asset?.AssetName,
                SerialNumber = t.Asset?.SerialNumber,
                AssignedEmployeeId = t.AssignedEmployeeId,
                EmployeeId = t.EmployeeId,
                AssignedEmployeeName = t.AssignedEmployee != null ? $"{t.AssignedEmployee.FirstName} {t.AssignedEmployee.LastName}" : "-"
            }).OrderByDescending(t => t.CreatedAt);

        }
        public async Task AssignTicketAsync(int ticketId, AssignTicketDTO dto)
        {
            var employee = await _employeeRepo.GetByIdAsync(dto.EmployeeId);
            if (employee == null)
            {
                throw new ArgumentException("Employee not found");
            }
            var ticket = await _ticketRepository.AssignTicketAsync(ticketId, dto.EmployeeId);
            if (ticket == null)
            {
                throw new ArgumentException("Ticket not found");
            }
            if (ticket.EmployeeId == dto.EmployeeId)
            {
                throw new ArgumentException(
                    "Ticket cannot be assigned to the employee who raised it."
                );
            }
        }
    }
}
