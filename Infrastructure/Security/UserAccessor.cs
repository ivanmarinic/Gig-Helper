using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        public string GetCurrentUsername()
        {
            //inside HttpContext; if we have User, we can obtain Claims for User...
            var username = httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x =>
                x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }
    }
}
