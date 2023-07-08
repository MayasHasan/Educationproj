using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Course : AuditableEntity
        
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; }
        public decimal FullPrice { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; } 
        public DateTime? EndDate { get; set; }
        public string Level { get; set; }
        public Guid? TeacherId { get; set; }
        public Teacher? Teacher { get; set; } 
        public IList<Student> Students { get; set; } = null;
        public IList<Session> Sessions { get; set; } = null;
        public IList<File> Files { get; set; } = null;


    }

}
