using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerViewDto
    {
        public Guid? Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public ICollection<Guid> TagIds { get; set; }
        
    }
}