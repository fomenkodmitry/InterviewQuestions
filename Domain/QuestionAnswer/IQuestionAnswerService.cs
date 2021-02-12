using System.Collections.Generic;

namespace Domain.QuestionAnswer
{
    public interface IQuestionAnswerService
    {
        public IEnumerable<QuestionAnswerModel> Get(ProgrammingLanguage programmingLanguage);
    }
}