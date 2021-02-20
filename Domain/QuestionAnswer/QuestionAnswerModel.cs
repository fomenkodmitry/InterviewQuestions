using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain.Base;
using Domain.Tag;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerModel : BaseModel
    {
        [MaxLength(255)]
        [Required]
        public string Question { get; set; }
        [Required]
        public string Answer { get; set; }
        
        public ICollection<QuestionAnswerToTagModel> TagIds { get; set; }
    }
}