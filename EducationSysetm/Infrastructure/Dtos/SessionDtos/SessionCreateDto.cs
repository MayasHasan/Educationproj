using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.SessionDtos
{
    public class SessionCreateDto
    {
        public string SessionTitle { get; set; }
        public DateTime? Date { get; set; }
        public Guid? CourseId { get; set; }
        public string Description { get; set; }
    }
}
