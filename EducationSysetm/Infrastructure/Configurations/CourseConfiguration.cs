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
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {

            builder.HasMany(e => e.Sessions)
                    .WithOne(e => e.Course)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(e => e.Files)
                   .WithOne(e => e.Course)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(c => c.Title)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.Property(c => c.Description)
                   .IsRequired()
                   .HasMaxLength(2500);
            builder.Property(c => c.FullPrice)
                      .IsRequired()
                      .HasMaxLength(20);

           



        }
    }
}

