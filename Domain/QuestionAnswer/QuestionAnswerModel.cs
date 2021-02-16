using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Domain.Base;
using Domain.ProgrammingLanguage;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerModel : BaseModel
    {
        [JsonIgnore]
        public ProgrammingLanguageModel ProgrammingLanguage { get; set; }
        public Guid ProgrammingLanguageId { get; set; }
        [MaxLength(255)]
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}