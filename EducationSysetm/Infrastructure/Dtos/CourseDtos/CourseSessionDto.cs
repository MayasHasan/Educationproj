using Infrastructure.Dtos.SessionDtos;
using Infrastructure.Dtos.StudentDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.CourseDtos
{
    public class CourseSessionDto
    {
        public List<SessionDto> sessionDto { get; set; }

    }
}
