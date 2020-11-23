using Application.Errors;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class ExternalLogin
    {
        public class Query : IRequest<User> 
        {
            public string AccessToken { get; set; }
        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IFacebookAccessor facebookAccessor;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator,
                IFacebookAccessor facebookAccessor)
            {
                this.facebookAccessor = facebookAccessor;
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var userInfo = await facebookAccessor.FacebookLogin(request.AccessToken);

                if (userInfo == null)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { User = "Problem validating token"});

                var user = await userManager.FindByEmailAsync(userInfo.Email);

                if(user == null)
                {
                    user = new AppUser
                    {
                        DisplayName = userInfo.Name,
                        Id = userInfo.Id,
                        Email = userInfo.Email,
                        UserName = "fb_" + userInfo.Id
                    };

                    var photo = new Photo
                    {
                        Id = "fb_" + userInfo.Id,
                        Url = userInfo.Picture.Data.Url,
                        IsMain = true
                    };

                    user.Photos.Add(photo);

                    var result = await userManager.CreateAsync(user);

                    if (!result.Succeeded)
                        throw new RestException(System.Net.HttpStatusCode.BadRequest, new { User = "Problem creating user" });
                }

                return new User
                {
                    DisplayName = user.DisplayName,
                    Token = jwtGenerator.CreateToken(user),
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
                };
                
            }
        }
    }
}
