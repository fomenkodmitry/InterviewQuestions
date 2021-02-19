using System;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerFilter
    {
        public Guid? ProgrammingLanguageId { get; set; }

        public string SearchText { get; set; }
    }
}