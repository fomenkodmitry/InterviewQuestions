using System;
using System.Security.Claims;
using Domain.Base;
using Microsoft.AspNetCore.Mvc;
using Domain.Error;
using Domain.User;

namespace Api.Controllers.Base
{
    public class BaseController : Controller
    {
        
        public BaseController(IUserService userService)
        {
            UserService = userService;
        }
        
        protected BadRequestObjectResult BadRequest(ErrorCodes code, string property)
            => BadRequest(new ErrorContainer(code, property));
        
        #region Protected

        protected ActionResult<T> ProcessResult<T>(ResultContainer<T> result)
        {
            if (result.Error.HasValue)
                return BadRequest(new ErrorContainer(result.Error.Value, result.ErrorField));

            return Ok(result.Result);
        }

        protected IUserService UserService { get; }
        
        private UserModel _currentUser;

        protected UserModel CurrentUser
        {
            get
            {
                if (_currentUser != null)
                    return _currentUser;

                _currentUser = UserService.GetById(Guid.Parse(User.FindFirstValue(ClaimTypes.Name))).Result;

                return _currentUser;
            }
        }

        #endregion
    }
}