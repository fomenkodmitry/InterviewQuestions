using Domain.Base;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Toolbelt.ComponentModel.DataAnnotations.Schema.V5;

namespace Domain.User
{
    public class UserModel : BaseModel
    {
        /// <summary>
        /// User Email
        /// </summary>
        [Required]
        [EmailAddress]
        [IndexColumn(IsClustered = false, IsUnique = true)]
        public string Email { get; set; }

        /// <summary>
        /// User Password
        /// </summary>
        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        [JsonIgnore]
        public string Password { get; set; }
    }
}