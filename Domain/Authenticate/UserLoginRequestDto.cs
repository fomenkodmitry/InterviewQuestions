﻿using System.ComponentModel.DataAnnotations;

namespace Domain.Authenticate
{
    public class UserLoginRequestDto
    {
        [Required]
        [MinLength(6)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}