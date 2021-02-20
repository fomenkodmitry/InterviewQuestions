using System.Collections.Generic;
using Domain.Tag;
using Infrastructure.Repositories;

namespace Services.Implementations
{
    public class TagService : ITagService
    {
        private readonly IGenericRepository _genericRepository;

        public TagService(IGenericRepository genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public IEnumerable<TagModel> Get()
        {
            return _genericRepository.Get<TagModel>();
        }
    }
}