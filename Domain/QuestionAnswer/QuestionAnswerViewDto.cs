using System;
using System.Collections;
using System.Collections.Generic;
using Domain.Base;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerViewDto : IModel
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public ICollection<Guid> TagIds { get; set; }
        
    }
}