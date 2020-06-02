using System;
using System.Net;

namespace Application.errors
{
    public class RestExceptions: Exception

    {
    public HttpStatusCode Code { get; }
    public object Errors { get; }

    public RestExceptions(HttpStatusCode code, object errors = null)
    {
        Code = code;
        Errors = errors;
    }
    }
}