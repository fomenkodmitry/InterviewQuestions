﻿using System;
using System.ComponentModel.DataAnnotations;
using Domain.Base;
using Domain.User;
using Toolbelt.ComponentModel.DataAnnotations.Schema.V5;

namespace Domain.Token
{
    public class TokenModel: BaseModel
    {
        [Required]
        public string Token { get; set; }

        [IndexColumn(IsClustered =  false, IsUnique = false)]
        [Required]
        public Guid? UserId { get; set; }

        public UserModel User { get; set; }
    }
}