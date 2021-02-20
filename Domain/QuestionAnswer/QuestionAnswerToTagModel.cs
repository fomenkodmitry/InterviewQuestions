using System;
using System.Text.Json.Serialization;
using Domain.Base;
using Domain.Tag;

namespace Domain.QuestionAnswer
{
    public class QuestionAnswerToTagModel : BaseModel
    {
        [JsonIgnore]
        public QuestionAnswerModel QuestionAnswer { get; set; }
        [JsonIgnore]
        public Guid QuestionAnswerId { get; set; }
       
        [JsonIgnore]
        public TagModel Tag { get; set; }
        public Guid TagId { get; set; }
    }
}