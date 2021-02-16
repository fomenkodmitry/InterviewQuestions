using System.Collections.Generic;
using Api.Controllers.Base;
using Domain.ProgrammingLanguage;
using Domain.QuestionAnswer;
using Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ProgrammingLanguageController : BaseController
    {
        private readonly IProgrammingLanguageService _programmingLanguageService;
        
        public ProgrammingLanguageController(IUserService userService, IProgrammingLanguageService programmingLanguageService) : base(userService)
        {
            _programmingLanguageService = programmingLanguageService;
        }

        /// <summary>
        /// Get pl data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<QuestionAnswerModel>> Get()
        {
            return Ok(_programmingLanguageService.Get());
        }
    }
}