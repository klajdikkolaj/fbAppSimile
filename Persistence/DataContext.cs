using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Values> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Values>().HasData(
                new Values {Id = 1, Name = "First"},
                new Values {Id = 2, Name = "Second"},
                new Values {Id = 3, Name = "Third"}
                );
        }
    }
}