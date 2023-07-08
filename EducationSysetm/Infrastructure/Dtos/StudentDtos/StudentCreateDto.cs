using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.StudentDtos
{
    public class StudentCreateDto
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Level { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public DateTime? JoinedDate { get; set; }
    }
}
