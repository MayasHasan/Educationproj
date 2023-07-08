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
    public class StudentConfiguration: IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
           
            builder.Property(s => s.FirstName)
                   .IsRequired()
                   .HasMaxLength(20);
            builder.Property(s => s.LastName)
                  .IsRequired()
                  .HasMaxLength(20);
            builder.Property(s => s.Email)
                .IsRequired();
              
        }
    }
}
