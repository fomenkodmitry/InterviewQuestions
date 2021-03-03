using System;
using Domain.Base;

namespace Domain.User
{
    public class UserViewDto : IModel
    {
        public Guid Id { get; set; }
    }
}