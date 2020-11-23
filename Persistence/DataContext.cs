using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<Performer> Performers { get; set; }
        public DbSet<SongSet> SongSet { get; set; }
        public DbSet<SongPerformer> SongPerformer { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Many-to-many: Song <-> Set
            modelBuilder.Entity<SongSet>()
                .HasKey(ss => new { ss.SongId, ss.SetId });

            // Many-to-many: Song <-> Performer
            modelBuilder.Entity<SongPerformer>()
                .HasKey(sp => new { sp.SongId, sp.PerformerId });

            modelBuilder.Entity<SongSet>()
                .HasOne(so => so.Song)
                .WithMany(se => se.SongSet)
                .HasForeignKey(so => so.SongId);

            modelBuilder.Entity<SongSet>()
                .HasOne(se => se.Set)
                .WithMany(so => so.SongSet)
                .HasForeignKey(se => se.SetId);

            modelBuilder.Entity<SongPerformer>()
                .HasOne(so => so.Song)
                .WithMany(sp => sp.SongPerformer)
                .HasForeignKey(so => so.SongId);

            modelBuilder.Entity<SongPerformer>()
                .HasOne(p => p.Performer)
                .WithMany(sp => sp.SongPerformer)
                .HasForeignKey(p => p.PerformerId);
        }
    }
}
