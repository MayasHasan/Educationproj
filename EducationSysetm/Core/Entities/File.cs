using Core.Common;
using Core.Contracts;
using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Core.Entities
{
    public class File : AuditableEntity  
    {    
        public Guid FileId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime InsertOn { get; set; }
        public bool IsProfile { get; set; }
        public Teacher Teacher { get; set; }
        public Guid? TeacherId { get; set; }
        public Student Student { get; set; }
        public Guid? StudentId { get; set; }
        public Course Course { get; set; }
        public Guid? CourseId { get; set; }
        public Session Session { get; set; }
        public Guid? SessionId { get; set; }
    }
}
