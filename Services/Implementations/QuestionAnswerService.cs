using System.Collections.Generic;
using System.Threading.Tasks;
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

        public IEnumerable<QuestionAnswerModel> Get(QuestionAnswerFilter filter)
        {
            if(filter.ProgrammingLanguageId.HasValue)
                return _genericRepository.Get<QuestionAnswerModel>(p => p.ProgrammingLanguageId == filter.ProgrammingLanguageId);
            
            return _genericRepository.Get<QuestionAnswerModel>();
        }

        public async Task<QuestionAnswerModel> Create(QuestionAnswerModel model)
        {
            return await _genericRepository.Create(new QuestionAnswerModel()
            {
                Question = model.Question,
                Answer = model.Answer,
                IsActive = true,
                IsDelete = false,
                ProgrammingLanguageId = model.ProgrammingLanguageId
            });
            
            
        }
    }
}