using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.FileDtos
{
    public class FileDto
    {
        public IList<IFormFile> FilePath { get; set; }
    }
}
