using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.Base;
using Domain.QuestionAnswer;
using Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Question answer controller
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class QuestionAnswerController : BaseController
    {
        private readonly IQuestionAnswerService _questionAnswerService;

        /// <summary>
        /// DI
        /// </summary>
        /// <param name="questionAnswerService"></param>
        /// <param name="userService"></param>
        public QuestionAnswerController(IQuestionAnswerService questionAnswerService, IUserService userService) : base(userService)
        {
            _questionAnswerService = questionAnswerService;
        }

        /// <summary>
        /// Get question data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<QuestionAnswerViewDto>> Get([FromQuery] QuestionAnswerFilter filter)
        {
            return Ok(_questionAnswerService.Get(filter));
        }
        
        /// <summary>
        /// Create question
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<QuestionAnswerModel>> Create(QuestionAnswerCreateDto model)
        {
            return ProcessResult(await _questionAnswerService.Create(model));
        }
    }
}