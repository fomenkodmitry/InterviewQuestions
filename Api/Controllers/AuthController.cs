using System;
using System.Security.Claims;
using Domain.Authenticate;
using Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Api.Controllers.Base;

namespace Api.Controllers
{
    /// <summary>
    /// Login user
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;

        /// <summary>
        /// DI ctor
        /// </summary>
        /// <param name="authenticateService"></param>
        /// <param name="userService"></param>
        public AuthController(IAuthenticationService authenticateService, IUserService userService) : base(userService)
        {
            _authenticationService = authenticateService;
        }

        /// <summary>
        /// User login
        /// </summary>
        /// <param name="requestDto" class="UserLoginRequestDto"></param>
        /// <returns class="UserLoginResponseDto">UserLoginResponseDto</returns>
        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<UserLoginResponseDto>> Login([FromBody] UserLoginRequestDto requestDto)
        {
            return ProcessResult(await _authenticationService.Login(requestDto));
        }

        /// <summary>
        /// Logout
        /// </summary>
        /// <returns>200 OK</returns>
        [HttpPost("[action]")]
        public async Task<ActionResult> Logout()
        {
            if (Guid.TryParse(User.FindFirstValue(ClaimTypes.Sid), out var sessionId))
                await _authenticationService.Logout(sessionId);
            return Ok();
        }
    }
}