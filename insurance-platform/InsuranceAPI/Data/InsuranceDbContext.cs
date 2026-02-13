using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Models;

namespace InsuranceAPI.Data
{
    public class InsuranceDbContext : DbContext
    {
        public InsuranceDbContext(DbContextOptions<InsuranceDbContext> options) : base(options)
        {
        }

        public DbSet<PolicyCategory> PolicyCategories { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Policy>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Policies)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Quote>()
                .HasOne(q => q.Policy)
                .WithMany(p => p.Quotes)
                .HasForeignKey(q => q.PolicyId)
                .OnDelete(DeleteBehavior.Cascade);

            // Index for performance
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }

        public void SeedInitialData()
        {
            // Only seed if database is empty
            if (PolicyCategories.Any())
                return;

            // Add Categories
            var categories = new List<PolicyCategory>
            {
                new PolicyCategory { Id = 1, Name_Ro = "Asigurări Auto", Name_En = "Auto Insurance", Description_Ro = "Protejează-ți mașina", Description_En = "Protect your vehicle", Icon = "🚗", Order = 1 },
                new PolicyCategory { Id = 2, Name_Ro = "Locuință", Name_En = "Home Insurance", Description_Ro = "Protejează-ți casa", Description_En = "Protect your home", Icon = "🏠", Order = 2 },
                new PolicyCategory { Id = 3, Name_Ro = "Viață", Name_En = "Life Insurance", Description_Ro = "Protejează-ți familia", Description_En = "Protect your family", Icon = "❤️", Order = 3 },
                new PolicyCategory { Id = 4, Name_Ro = "Sănătate", Name_En = "Health Insurance", Description_Ro = "Protejează-ți sănătatea", Description_En = "Protect your health", Icon = "⚕️", Order = 4 },
                new PolicyCategory { Id = 5, Name_Ro = "Călători în Străinătate", Name_En = "Travel Insurance", Description_Ro = "Călătorește în liniște", Description_En = "Travel with peace of mind", Icon = "✈️", Order = 5 },
                new PolicyCategory { Id = 6, Name_Ro = "Afaceri", Name_En = "Business Insurance", Description_Ro = "Protejează-ți business-ul", Description_En = "Protect your business", Icon = "💼", Order = 6 }
            };

            PolicyCategories.AddRange(categories);
            SaveChanges();

            // Add Policies
            var policies = new List<Policy>
            {
                new Policy { Id = 1, Name = "Casco Complet", Type = "Auto", Description_Ro = "Protecție completă", Description_En = "Complete protection", BasePrice = 500, Coverage = "Incendiu, Furt, Daune", CategoryId = 1, Details_Ro = "Casco complet", Details_En = "Full casco", IsActive = true },
                new Policy { Id = 2, Name = "RCA Standard", Type = "Auto", Description_Ro = "Răspundere civila", Description_En = "Civil liability", BasePrice = 300, Coverage = "Răspundere civila", CategoryId = 1, Details_Ro = "RCA standard", Details_En = "Standard RCA", IsActive = true },
                new Policy { Id = 3, Name = "Asigurare Locuință Complet", Type = "Home", Description_Ro = "Protecție completă", Description_En = "Complete protection", BasePrice = 400, Coverage = "Incendiu, Furt, Daune", CategoryId = 2, Details_Ro = "Habitație complet", Details_En = "Full home", IsActive = true },
                new Policy { Id = 4, Name = "Asigurare Viață Termen", Type = "Life", Description_Ro = "Protecție financiară", Description_En = "Financial protection", BasePrice = 150, Coverage = "Riscuri de deces", CategoryId = 3, Details_Ro = "Viață termen", Details_En = "Term life", IsActive = true },
                new Policy { Id = 5, Name = "Asigurare Sănătate Bază", Type = "Health", Description_Ro = "Acoperire medicală", Description_En = "Medical coverage", BasePrice = 200, Coverage = "Spitalizare, Urgență", CategoryId = 4, Details_Ro = "Sănătate bază", Details_En = "Basic health", IsActive = true },
                new Policy { Id = 6, Name = "Asigurare Călători Europa", Type = "Travel", Description_Ro = "Protecție călători", Description_En = "Travel protection", BasePrice = 50, Coverage = "Spitalizare, Bagaj, Anulare", CategoryId = 5, Details_Ro = "Călători Europa", Details_En = "Travel Europe", IsActive = true }
            };

            Policies.AddRange(policies);
            SaveChanges();

            // Seed admin user if not exists
            if (!Users.Any())
            {
                var authService = new Services.AuthService();
                var adminUser = new User
                {
                    Id = 1,
                    Email = "admin@manadviser.ro",
                    PasswordHash = authService.HashPassword("admin123"),
                    FirstName = "Admin",
                    LastName = "User",
                    Role = "Admin",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                Users.Add(adminUser);
                SaveChanges();
            }
        }
    }
}
