using System.Collections.Generic;
using Domain.ProgrammingLanguage;
using Infrastructure.Repositories;

namespace Services.Implementations
{
    public class ProgrammingLanguageService : IProgrammingLanguageService
    {
        private readonly IGenericRepository _genericRepository;

        public ProgrammingLanguageService(IGenericRepository genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public IEnumerable<ProgrammingLanguageModel> Get()
        {
            return _genericRepository.Get<ProgrammingLanguageModel>();
        }
    }
}