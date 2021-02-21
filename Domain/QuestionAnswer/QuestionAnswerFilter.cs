using System;
using System.Collections.Generic;
using Domain.Filter;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerFilter : BaseFilterDto
    {
        public IEnumerable<Guid> TagIds { get; set; }

        public string SearchText { get; set; }
    }
}