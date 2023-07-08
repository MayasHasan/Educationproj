using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Hosting;
using System.Data.Entity;
using System.Diagnostics;
using System.Reflection.Emit;


namespace Infrastructure.Configurations
{
    public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {

            builder.HasMany(e => e.Files)
          .WithOne(e => e.Session)
            .HasForeignKey(s => s.FileId)
          .OnDelete(DeleteBehavior.ClientSetNull);



            builder.Property(s => s.SessionTitle)
            .IsRequired()
            .HasMaxLength(20);
           
        }
    }
}
