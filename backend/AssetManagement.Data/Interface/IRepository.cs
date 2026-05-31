using AssetManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Interface
{  public interface IRepository<T> where T : BaseEntity
  
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        void Update(T entity);
        Task SoftDeleteAsync(int id);
        Task SaveAsync();
    }
}
