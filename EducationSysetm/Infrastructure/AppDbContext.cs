using Core.Common;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Infrastructure.Identity.RoleConfiguration;
using Infrastructure.Configurations;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;
using Core.Models.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata;
using Infrastructure.Dtos.TeacherDtos;

namespace Infrastructure
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        public AppDbContext(DbContextOptions<AppDbContext> option) : base(option)
        {

        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<File> Files { get; set; }



        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = DateTime.Now;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new CourseConfiguration().Configure(modelBuilder.Entity<Course>());
            new SessionConfiguration().Configure(modelBuilder.Entity<Session>());
            new StudentConfiguration().Configure(modelBuilder.Entity<Student>());
            new TeacherConfiguration().Configure(modelBuilder.Entity<Teacher>());
            new FileConfiguration().Configure(modelBuilder.Entity<File>());


            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());

 

            
        }
    }
}

