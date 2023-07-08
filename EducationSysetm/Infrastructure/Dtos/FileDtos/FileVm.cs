using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.FileDtos
{
    public class FileVm
    {
        public Guid FileId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime InsertOn { get; set; }
        public bool IsProfile { get; set; }
    }
}
