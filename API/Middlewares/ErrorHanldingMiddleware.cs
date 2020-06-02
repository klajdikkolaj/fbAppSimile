using System;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Application.errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ErrorHanldingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHanldingMiddleware> _logger;

        public ErrorHanldingMiddleware(RequestDelegate next, ILogger<ErrorHanldingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex,
            ILogger<ErrorHanldingMiddleware> logger)
        {
            object errors = null;
            switch (ex)
            {
                case RestExceptions re:
                    logger.LogError(ex, "Rest Error");
                    errors = re.Errors;
                    context.Response.StatusCode = (int) re.Code;
                    break;
                case Exception e:
                    logger.LogError(ex, "Internal Server Error");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "error" : e.Message;
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";
            if (errors != null)
            {
                var result = JsonSerializer.Serialize(new
                {
                    errors
                });
                await context.Response.WriteAsync(result);
            }
        }
    }
}