using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.QuestionAnswer;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

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
            var query = _genericRepository.Get<QuestionAnswerModel>().AsQueryable();
            if(filter.ProgrammingLanguageId.HasValue)
                query = query.Where(p => p.ProgrammingLanguageId == filter.ProgrammingLanguageId);
            if (!string.IsNullOrEmpty(filter.SearchText))
                query = query.Where(p =>
                    EF.Functions.ILike(p.Question, $"%{filter.SearchText}%") 
                    ||
                    EF.Functions.ILike(p.Answer, $"%{filter.SearchText}%") 
                );
            return query;
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