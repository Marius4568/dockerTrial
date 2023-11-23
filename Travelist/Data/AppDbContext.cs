using Microsoft.EntityFrameworkCore;
using Travelist.Models;

namespace Travelist.Data
{
    public class AppDbContext: DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public static void EnsureMigrated(AppDbContext context)
        {
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(user => user.Id);
            modelBuilder.Entity<User>()
                .HasIndex(user => user.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasIndex(user => user.Username)
                .IsUnique();

            modelBuilder.Entity<TravelEntity>()
                .HasKey(travelEntity => travelEntity.Id);
            modelBuilder.Entity<TravelEntity>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(travelEntity => travelEntity.UserId);
            modelBuilder.Entity<TravelEntity>()
                .HasIndex(travelEntity => travelEntity.City);
            modelBuilder.Entity<TravelEntity>()
                .OwnsOne(travelEntity => travelEntity.Location);

            modelBuilder.Entity<TravelEntityLike>()
                .HasKey(travelEntityLike => 
                new 
                { 
                    travelEntityLike.UserId, 
                    travelEntityLike.TravelEntityId 
                });
            modelBuilder.Entity<TravelEntityLike>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(travelEntityLike => travelEntityLike.UserId)
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<TravelEntityLike>()
                .HasOne<TravelEntity>()
                .WithMany()
                .HasForeignKey(travelEntityLike => travelEntityLike.TravelEntityId)
                .OnDelete(DeleteBehavior.ClientCascade);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<TravelEntity> TravelEntities { get; set; }
        public DbSet<TravelEntityLike> TravelEntityLikes { get; set; }
    }
}
