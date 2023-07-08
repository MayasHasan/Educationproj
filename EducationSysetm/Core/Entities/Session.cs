using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Session : AuditableEntity
    {

        public Guid SessionId { get; set; }
        public string SessionTitle { get; set; }
        public DateTime? Date { get; set; }
        public Guid? CourseId { get; set; }
        public Course Course { get; set; } = null;
        public string Description { get; set; }
        public IList<Student> Students { get; set; } = null;
        public IList<File> Files { get; set; } = null;


    }
}
