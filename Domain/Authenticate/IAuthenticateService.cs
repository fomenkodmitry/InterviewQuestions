using System;
using System.Threading.Tasks;
using Domain.Base;

namespace Domain.Authenticate
{
    public interface IAuthenticationService
    {
        Task<ResultContainer<UserLoginResponseDto>> Login(UserLoginRequestDto requestDto);
        Task<ResultContainer<bool>> Logout(Guid sessionId);
    }
}