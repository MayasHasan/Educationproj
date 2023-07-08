using Core.Entities;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.StudentDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.SessionDtos
{
    public class SessionDto
    {
        public Guid SessionId { get; set; }
        public string SessionTitle { get; set; }
        public DateTime? Date { get; set; }
        public string Description { get; set; }

    }
}
