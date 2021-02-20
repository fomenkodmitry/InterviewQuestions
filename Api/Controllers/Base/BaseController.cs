using Microsoft.AspNetCore.Mvc;
using Domain.Error;

namespace Api.Controllers.Base
{
    public class BaseController : Controller
    {
        
        protected BadRequestObjectResult BadRequest(ErrorCodes code, string property)
            => BadRequest(new ErrorContainer(code, property));
    }
}