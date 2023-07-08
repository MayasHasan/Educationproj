using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.SessionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.StudentDtos
{
    public class StudentVm
    {
        public Guid StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Level { get; set; }
        public string Address { get; set; }
        public DateTime? JoinedDate { get; set; }
        public IList<SessionDto> Sessions { get; set; } = null;
        public IList<CourseDto> Courses { get; set; } = null;
    }
}
