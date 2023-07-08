using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class TeacherConfiguration: IEntityTypeConfiguration<Teacher>
    {
    
        public void Configure(EntityTypeBuilder<Teacher> builder)
        {
            builder
        .HasMany(e => e.Courses)
        .WithOne(e => e.Teacher)
        .OnDelete(DeleteBehavior.SetNull);

            builder.Property(t => t.FirstName)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(t => t.LastName)
                  .IsRequired()
                  .HasMaxLength(20);

            builder.Property(t => t.Salary)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(t => t.Email)
           .IsRequired();



        }
    }
}
