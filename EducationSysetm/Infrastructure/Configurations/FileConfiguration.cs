using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class FileConfiguration : IEntityTypeConfiguration<File>
    {
        public void Configure(EntityTypeBuilder<File>  builder)
        {
            //builder.HasKey(c => c.FileId);
            builder.Property(c => c.FileName)
                   .IsRequired()
                   .HasMaxLength(20);


         
        }
      
    }

}
