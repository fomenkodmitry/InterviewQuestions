using System.Collections.Generic;
using Api.Controllers.Base;
using Domain.QuestionAnswer;
using Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class QuestionAnswerController : BaseController
    {
        private readonly IQuestionAnswerService _questionAnswerService;
        
        public QuestionAnswerController(IUserService userService, IQuestionAnswerService questionAnswerService) : base(userService)
        {
            _questionAnswerService = questionAnswerService;
        }

        /// <summary>
        /// Get question data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<QuestionAnswerModel>> Get()
        {
            return Ok(_questionAnswerService.Get());
        }
    }
}