using System.Collections.Generic;

namespace Domain.Tag
{
    public interface ITagService
    {
        public IEnumerable<TagModel> Get();
    }
}