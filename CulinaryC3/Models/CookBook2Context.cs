using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class CookBook2Context : DbContext
    {
        public CookBook2Context()
        {
        }

        public CookBook2Context(DbContextOptions<CookBook2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Favorite> Favorite { get; set; }
        public virtual DbSet<Friends> Friends { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Ingredients> Ingredients { get; set; }
        public virtual DbSet<Invites> Invites { get; set; }
        public virtual DbSet<RecipeIngredients> RecipeIngredients { get; set; }
        public virtual DbSet<Recipes> Recipes { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=CookBook2;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Favorite)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Favorite__UserId__6477ECF3");
            });

            modelBuilder.Entity<Friends>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Friends)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Friends__UserId__6A30C649");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.GroupName).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Group)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Group__UserId__5EBF139D");
            });

            modelBuilder.Entity<Ingredients>(entity =>
            {
                entity.Property(e => e.Aisle).HasMaxLength(50);

                entity.Property(e => e.BaseUnit).HasMaxLength(15);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Invites>(entity =>
            {
                entity.Property(e => e.InviterEmail).HasMaxLength(50);

                entity.Property(e => e.NameofGroup).HasMaxLength(50);
            });

            modelBuilder.Entity<RecipeIngredients>(entity =>
            {
                entity.Property(e => e.IngredientId).HasColumnName("IngredientID");

                entity.Property(e => e.InputUnit).HasMaxLength(15);

                entity.Property(e => e.RecipeId).HasColumnName("RecipeID");

                entity.HasOne(d => d.Ingredient)
                    .WithMany(p => p.RecipeIngredients)
                    .HasForeignKey(d => d.IngredientId)
                    .HasConstraintName("FK__RecipeIng__Ingre__6383C8BA");

                entity.HasOne(d => d.Recipe)
                    .WithMany(p => p.RecipeIngredients)
                    .HasForeignKey(d => d.RecipeId)
                    .HasConstraintName("FK__RecipeIng__Recip__628FA481");
            });

            modelBuilder.Entity<Recipes>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.RecipeName).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Recipes__UserId__619B8048");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.LoginId).HasMaxLength(450);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.Picture).HasMaxLength(100);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
