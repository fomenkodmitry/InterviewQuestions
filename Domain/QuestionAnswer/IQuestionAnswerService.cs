using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.QuestionAnswer
{
    public interface IQuestionAnswerService
    {
        public IEnumerable<QuestionAnswerModel> Get(QuestionAnswerFilter programmingLanguage);
        public Task<QuestionAnswerModel> Create(QuestionAnswerModel model);
    }
}