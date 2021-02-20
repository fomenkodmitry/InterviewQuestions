using Domain.QuestionAnswer;
using Domain.Tag;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Contexts
{
    public sealed class Context : DbContext
    {
        public Context (DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<QuestionAnswerModel> QuestionAnswers { get; set; }
        public DbSet<TagModel> Tags { get; set; }
        public DbSet<QuestionAnswerToTagModel> QuestionAnswerToTags { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestionAnswerToTagModel>()
                .HasIndex(b => new {b.QuestionAnswerId, b.TagId})
                .IsUnique();
        }
    }
}