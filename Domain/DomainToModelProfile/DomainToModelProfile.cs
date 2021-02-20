using System.Linq;
using AutoMapper;
using Domain.QuestionAnswer;

namespace Domain.DomainToModelProfile
{
    /// <summary>
    /// Mapper profile
    /// </summary>
    public class DomainToModelProfile : Profile
    {
        public DomainToModelProfile()
        {
            int userId = 0;

            #region -- Test --
            CreateMap<QuestionAnswerModel, QuestionAnswerViewDto>()
                .ForMember(dst => dst.TagIds, src =>
                    src.MapFrom(x => x.TagIds.Select(p => p.TagId)))
                ;
            #endregion
        }
    }
}