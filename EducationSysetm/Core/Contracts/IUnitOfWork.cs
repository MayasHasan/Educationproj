using Core.Entities;
using Core.Models.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Course> Courses { get; }
        IGenericRepository<Teacher> Teachers { get; }
        IGenericRepository<Session> Sessions { get; }
        IGenericRepository<Student> Students { get; }
        IGenericRepository<File>Files { get; }
        IGenericRepository<ApplicationUser> ApplicationUsers { get; }



        Task<int> Save(); 
    }
}
