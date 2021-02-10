using Domain.Base;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerModel : BaseModel
    {
        public ProgrammingLanguage ProgrammingLanguage { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}