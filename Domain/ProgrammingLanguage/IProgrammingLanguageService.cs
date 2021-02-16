using System.Collections.Generic;

namespace Domain.ProgrammingLanguage
{
    public interface IProgrammingLanguageService
    {
        public IEnumerable<ProgrammingLanguageModel> Get();
    }
}