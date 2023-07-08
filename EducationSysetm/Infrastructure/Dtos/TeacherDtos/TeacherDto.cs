using Core.Entities;
using Infrastructure.Dtos.CourseDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.TeacherDtos
{
    public class TeacherDto
    {
        public Guid TeacherId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Specialization { get; set; }
        public decimal Salary { get; set; }
        public string Notes { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime? JoinedDate { get; set; }
    }
}
