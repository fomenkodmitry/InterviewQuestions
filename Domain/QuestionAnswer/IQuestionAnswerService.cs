using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Base;
using Domain.Filter;
using Domain.User;

namespace Domain.QuestionAnswer
{
    public interface IQuestionAnswerService
    {
        public FilteredItemsDto<QuestionAnswerViewDto> Get(QuestionAnswerFilter programmingLanguage);
        public Task<ResultContainer<QuestionAnswerModel>> Create(QuestionAnswerCreateDto model);
    }
}