using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.TeacherDtos
{
    public class TeacherCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Specialization { get; set; }
        public decimal? Salary { get; set; } 
        public string Notes { get; set; }
        public DateTime? JoinedDate { get; set; }=DateTime.Now;
        public string Password { get; set; } = "Aa@123";
    }
}
