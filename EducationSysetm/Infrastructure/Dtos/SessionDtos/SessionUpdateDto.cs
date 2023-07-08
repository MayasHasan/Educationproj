using Core.Entities;
using Infrastructure.Dtos.StudentDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.SessionDtos
{
    public class SessionUpdateDto
    {
        public string SessionTitle { get; set; }
        public DateTime? Date { get; set; }
        public string Description { get; set; }
        public Guid? CourseId { get; set; }
    }
}
