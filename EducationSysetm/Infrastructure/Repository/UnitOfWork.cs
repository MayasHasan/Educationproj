using Core.Entities;
using Core.IRepository;
using Core.Models.Authentication;
using Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        private readonly IGenericRepository<Course> _courses;
        private readonly IGenericRepository<Teacher> _teachers;
        private readonly IGenericRepository<Session> _sessions;
        private readonly IGenericRepository<Student> _students;
       private readonly IGenericRepository<ApplicationUser> _applicationUsers;
        private readonly IGenericRepository<File> _files;

        public UnitOfWork(AppDbContext context,
            IGenericRepository<Course> courses,
           IGenericRepository<Teacher> teachers,
           IGenericRepository<Session> sessions,
           IGenericRepository<Student> students,
           IGenericRepository<ApplicationUser> applicationUsers,
         IGenericRepository<File> files

           )

        {
            _context = context;
            _courses = courses;
            _teachers = teachers;
            _sessions = sessions;
            _students = students;
            _applicationUsers = applicationUsers;
            _files = files;
        }
        public IGenericRepository<Course> Courses => _courses;

        public IGenericRepository<Teacher> Teachers => _teachers;

        public IGenericRepository<Session> Sessions => _sessions;

        public IGenericRepository<Student> Students => _students;

        public IGenericRepository<File> Files => _files;

        public IGenericRepository<ApplicationUser> ApplicationUsers => _applicationUsers;


        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
