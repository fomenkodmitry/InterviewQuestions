using System;
using System.Collections.Generic;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerFilter
    {
        public IEnumerable<Guid> TagIds { get; set; }

        public string SearchText { get; set; }
    }
}