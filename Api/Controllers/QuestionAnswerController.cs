using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.Base;
using Domain.QuestionAnswer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Question answer controller
    /// </summary>
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class QuestionAnswerController : BaseController
    {
        private readonly IQuestionAnswerService _questionAnswerService;
        
        /// <summary>
        /// DI
        /// </summary>
        /// <param name="questionAnswerService"></param>
        public QuestionAnswerController(IQuestionAnswerService questionAnswerService) : base()
        {
            _questionAnswerService = questionAnswerService;
        }

        /// <summary>
        /// Get question data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<QuestionAnswerModel>> Get([FromQuery] QuestionAnswerFilter filter)
        {
            return Ok(_questionAnswerService.Get(filter));
        }
        
        /// <summary>
        /// Create question
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<QuestionAnswerModel>> Create(QuestionAnswerModel model)
        {
            return Ok(await _questionAnswerService.Create(model));
        }
    }
}