using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Filter;

namespace Domain.QuestionAnswer
{
    public interface IQuestionAnswerService
    {
        public FilteredItemsDto<QuestionAnswerViewDto> Get(QuestionAnswerFilter programmingLanguage);
        public Task<QuestionAnswerModel> Create(QuestionAnswerCreateDto model);
    }
}