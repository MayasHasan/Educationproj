using Core.Entities;
using Infrastructure.Dtos.FileDtos;
using Infrastructure.Dtos.SessionDtos;
using Infrastructure.Dtos.StudentDtos;
using Infrastructure.Dtos.TeacherDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.CourseDtos
{
    public class CourseDto
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; }
        public decimal FullPrice { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Level { get; set; }
        public IList<FileVm >Files { get; set; }

    }
}
