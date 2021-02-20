using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.QuestionAnswer
{
    public interface IQuestionAnswerService
    {
        public IEnumerable<QuestionAnswerViewDto> Get(QuestionAnswerFilter programmingLanguage);
        public Task<QuestionAnswerModel> Create(QuestionAnswerCreateDto model);
    }
}