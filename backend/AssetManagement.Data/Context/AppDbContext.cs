using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using AssetManagement.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AssetManagement.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetAssignment> AssetAssignments { get; set; }
        public DbSet<AssetDocument> AssetDocuments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<MaintenanceLog> MaintainanceLogs { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    var method = typeof(AppDbContext)
                        .GetMethod(nameof(SetSoftDeleteFilter), System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static)
                        .MakeGenericMethod(entityType.ClrType);

                    method.Invoke(null, new object[] { modelBuilder });
                }
            }
            modelBuilder.Entity<Employee>()
                .HasOne(u => u.User)
                .WithOne(e => e.Employee)
                .HasForeignKey<User>(u => u.EmployeeId);

            modelBuilder.Entity<AssetAssignment>()
                .HasOne(emp => emp.Employee)
                .WithMany(e => e.AssetAssignments)
                .HasForeignKey(emp => emp.EmployeeId);

            modelBuilder.Entity<AssetAssignment>()
                .HasOne(a => a.Asset)
                .WithMany( a => a.AssetAssignments)
                .HasForeignKey(a => a.AssetId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Employee)
                .WithOne(e => e.User)
                .HasForeignKey<User>(u => u.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Asset>()
                .HasIndex(x => x.SerialNumber)
                .IsUnique();

            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Email)
                .IsUnique();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Department)
                .HasConversion<string>();

            modelBuilder.Entity<Asset>()
                .Property(a => a.Status)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            /*
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Employee)
                .WithMany(e => e.Tickets)
                .HasForeignKey(t => t.EmployeeId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Asset)
                .WithMany(a => a.Tickets)
                .HasForeignKey(t => t.AssetId);

            modelBuilder.Entity<AssetDocument>()
                .HasOne(d => d.Asset)
                .WithMany(a => a.Documents)
                .HasForeignKey(d => d.AssetId);

            modelBuilder.Entity<MaintenanceLog>()
                .HasOne(m => m.Asset)
                .WithMany(a => a.MaintenanceLogs)
                .HasForeignKey(m => m.AssetId);
            */

        }

        private static void SetSoftDeleteFilter<TEntity>(ModelBuilder modelBuilder) where TEntity : BaseEntity
        {
            modelBuilder.Entity<TEntity>()
                .HasQueryFilter(e => !e.IsDeleted);
        }
    }

}