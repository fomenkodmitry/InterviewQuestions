using System.Collections.Generic;
using Api.Controllers.Base;
using Domain.Tag;
using Domain.QuestionAnswer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Tags
    /// </summary>
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class TagController : BaseController
    {
        private readonly ITagService _tagService;
        
        /// <summary>
        /// DI
        /// </summary>
        /// <param name="tagService"></param>
        public TagController(ITagService tagService) : base()
        {
            _tagService = tagService;
        }

        /// <summary>
        /// Get tag data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<IEnumerable<QuestionAnswerModel>> Get()
        {
            return Ok(_tagService.Get());
        }
    }
}