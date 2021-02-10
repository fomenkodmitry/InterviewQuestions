using System.Collections.Generic;
using Domain.QuestionAnswer;
using Infrastructure.Repositories;

namespace Services.Implementations
{
    public class QuestionAnswerService : IQuestionAnswerService
    {
        private readonly IGenericRepository _genericRepository;

        public QuestionAnswerService(IGenericRepository genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public IEnumerable<QuestionAnswerModel> Get()
        {
            return _genericRepository.Get<QuestionAnswerModel>(p => !p.IsDelete);
        }
    }
}