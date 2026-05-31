using AssetManagement.Data.Context;
using AssetManagement.Data.Interface;
using AssetManagement.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public readonly AppDbContext _context;
        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.Employee)
                .FirstOrDefaultAsync(u => u.Username == username && !u.IsDeleted);
        }
        public async Task<List<int?>> GetAssignedEmployeeIdsAsync()
        {
            return await _context.Users
                .Where(u => !u.IsDeleted && u.EmployeeId != null)
                .Select(u => u.EmployeeId)
                .ToListAsync();
        }
    }
}
