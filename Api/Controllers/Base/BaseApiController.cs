using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Base;
using Domain.Error;
using Domain.Filter;
using Domain.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Controllers.Base
{
    /// <summary>
    /// Base Api class
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TFilter"></typeparam>
    public abstract class BaseApiController<T, TFilter> : BaseController 
        where T : BaseModel
        where TFilter : BaseFilterDto
        
    {
        /// <summary>
        /// DI ctor
        /// </summary>
        /// <param name="userService"></param>
        protected BaseApiController(IUserService userService) : base (userService)
        {
        }

        private IMapper Mapper { get; }

        /// <summary>
        /// Return all entities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public virtual async Task<ActionResult<FilteredItemsDto<T>>> Get(TFilter filter)
            => BadRequest(ErrorCodes.WrongOperation);
        
        /// <summary>
        /// Return entity by id
        /// </summary>
        /// <param name="id">Id entity</param>
        /// <returns>Model entity</returns>
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> Get(Guid id)
            => BadRequest(ErrorCodes.WrongOperation);


        /// <summary>
        /// Create entity
        /// </summary>
        /// <param name="model">Description new entity</param>
        /// <returns>Model created entity</returns>
        [HttpPost]
        public virtual async Task<ActionResult<T>> Post([FromBody] T model)
            => BadRequest(ErrorCodes.WrongOperation);

        /// <summary>
        /// Edit entity
        /// </summary>
        /// <param name="model">Model with edit fields</param>
        /// <returns>Model edited entity</returns>
        [HttpPut]
        public virtual async Task<ActionResult<T>> Put([FromBody] T model)
            => BadRequest(ErrorCodes.WrongOperation);

        /// <summary>
        /// Delete entity by Id
        /// </summary>
        /// <param name="id">Id entity</param>
        /// <returns>Model deleted entity</returns>
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<T>> Delete(Guid id)
            => BadRequest(ErrorCodes.WrongOperation);

        #region Response

        /// <summary>
        /// Response for bad request
        /// </summary>
        /// <param name="code">Error code</param>
        /// <param name="property">Field(optional)</param>
        /// <returns>BadRequest, text error</returns>
        private static BadRequestGenericResult<T> BadRequest(ErrorCodes code, params string[] property)
            => new BadRequestGenericResult<T>(new ErrorContainer(code, string.Join(",", property)));

        /// <summary>
        /// Response
        /// </summary>
        /// <param name="result">Result</param>
        /// <returns>Container With result</returns>
        protected ActionResult<T> ProcessResult(ResultContainer<T> result)
        {
            if (result.Error.HasValue)
                return BadRequest(result.Error.Value, result.ErrorField);

            return Ok(result.Result);
        }

        protected ActionResult<FilteredItemsCountDto> ProcessResult(ResultContainer<FilteredItemsCountDto> result)
        {
            if (result.Error.HasValue)
                return BadRequest(result.Error.Value, result.ErrorField);

            return Ok(result.Result);
        }

        protected ActionResult<IEnumerable<T>> ProcessResult(ResultContainer<IEnumerable<T>> result)
        {
            if (result.Error.HasValue)
                return BadRequest(result.Error.Value, result.ErrorField);

            return Ok(result.Result);
        }

        /// <summary>
        /// Response
        /// </summary>
        /// <param name="result">Result</param>
        /// <returns>Container With result</returns>
        protected ActionResult<T> ProcessResult<TM>(ResultContainer<TM> result)
        {
            if (result.Error.HasValue)
                return BadRequest(result.Error.Value, result.ErrorField);

            return Ok(result.Result);
        }
        
        protected ActionResult<IEnumerable<T>> ProcessResult<TM>(ResultContainer<IEnumerable<TM>> result)
        {
            if (result.Error.HasValue)
                return BadRequest(result.Error.Value, result.ErrorField);

            return Ok(result.Result);
        }
        
        #endregion

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            // ignoring for put request (validate for edited fields)
            if (
                (context.ActionDescriptor as ControllerActionDescriptor).ActionName == nameof(Put) ||
                (context.ActionDescriptor as ControllerActionDescriptor).ActionName == nameof(Delete)
            )
                BypassValidation();
        }

        private void BypassValidation()
        {
            ModelState.Clear();
        }
        
    }
}
