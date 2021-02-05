using Domain.Base;

namespace Domain.Article
{
    public class ArticleModel : BaseModel
    {
        public ProgrammingLanguage ProgrammingLanguage { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public Tag Tags { get; set; }
    }
}