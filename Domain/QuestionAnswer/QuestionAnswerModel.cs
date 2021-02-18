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
        [Required]
        public Guid ProgrammingLanguageId { get; set; }
        [MaxLength(255)]
        [Required]
        public string Question { get; set; }
        [Required]
        public string Answer { get; set; }
    }
}