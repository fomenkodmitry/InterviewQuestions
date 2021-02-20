using System.ComponentModel.DataAnnotations;
using Domain.Base;
using Toolbelt.ComponentModel.DataAnnotations.Schema.V5;

namespace Domain.Tag
{
    public class TagModel : BaseModel
    {
        [IndexColumn(IsClustered =  false, IsUnique = true)]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}