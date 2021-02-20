using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Infrastructure.Repositories;

namespace Api.Middleware
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IGenericRepository tokenRepository)
        {
            await _next(context);
        }
    }
}