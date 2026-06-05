using AssetManagement.Business.Interface;
using AssetManagement.Model.DTO.TicketDto;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpPost]
        public async Task<IActionResult> RaiseTicket([FromBody] CreateTicketDto dto)
        {
            await _ticketService.RaiseTicket(dto);
            return Ok("Ticket Raised Successfully");
        }
        [HttpGet("open-count/{employeeId}")]
        public async Task<IActionResult> GetOpenCount(int employeeId)
        {
            var count = await _ticketService.GetOpenTicketCount(employeeId);
            return Ok(count);
        }
        [HttpGet("total-count/{employeeId}")]
        public async Task<IActionResult> GetTotalTicketCount(int employeeId)
        {
            var count = await _ticketService.GetTotalTicketCountById(employeeId);
            return Ok(count);
        }
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetTicketsByEmployee(int employeeId)
        {
            var tickets = await _ticketService.GetTicketsByEmployee(employeeId);
            return Ok(tickets);
        }
    }
}
