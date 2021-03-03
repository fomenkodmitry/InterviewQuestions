using System.Collections.Generic;
using Api.Controllers.Base;
using Domain.Tag;
using Domain.QuestionAnswer;
using Domain.User;
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
        /// <param name="userService"></param>
        public TagController(ITagService tagService, IUserService userService) : base(userService)
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