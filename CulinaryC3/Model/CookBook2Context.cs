using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;



namespace CulinaryC3.Model
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

        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<Friend> Friends { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<Invite> Invites { get; set; }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server =.\\SQLExpress;Database=CookBook2;Trusted_Connection=True;ConnectRetryCount=0;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.ToTable("Favorite");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Favorites)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Favorite__UserId__6477ECF3");
            });

            modelBuilder.Entity<Friend>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Friends)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Friends__UserId__6A30C649");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Group");

                entity.Property(e => e.GroupName).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Group__UserId__5EBF139D");
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Aisle).HasMaxLength(50);

                entity.Property(e => e.Item).HasMaxLength(50);

                entity.Property(e => e.Unit).HasMaxLength(10);

                entity.HasOne(d => d.Recipe)
                    .WithMany(p => p.Ingredients)
                    .HasForeignKey(d => d.RecipeId)
                    .HasConstraintName("FK__Ingredien__Recip__6754599E");
            });

            modelBuilder.Entity<Invite>(entity =>
            {
                entity.Property(e => e.InviterEmail).HasMaxLength(50);

                entity.Property(e => e.NameofGroup).HasMaxLength(50);
            });

            modelBuilder.Entity<Recipe>(entity =>

            {
                entity.Property(e => e.RecipeName).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Recipes__UserId__619B8048");
            });

            modelBuilder.Entity<User>(entity =>

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
