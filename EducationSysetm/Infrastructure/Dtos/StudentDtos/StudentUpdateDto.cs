using Core.Entities;
using Infrastructure.Dtos.CourseDtos;
using Infrastructure.Dtos.SessionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.StudentDtos
{
    public class StudentUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Level { get; set; }
        public string Address { get; set; }

    }
}
