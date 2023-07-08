using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Student : AuditableEntity
    {
        public Guid StudentId { get; set; }
        public Guid AppUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Level { get; set; }
        public string Address { get; set; }
        public DateTime? JoinedDate { get; set; }
        public IList<Session> Sessions { get; set; } = null;
        public IList<Course>Courses { get; set; } = null;
        public IList<File> Files { get; set; } = null;

    }
}
