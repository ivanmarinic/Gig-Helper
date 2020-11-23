using Application.Errors;
using Application.Interfaces;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public static class Login
    {
        //here we put everything we can change and we need to provide
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        //handler vraca listu activityja (desno) 
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager
                , IJwtGenerator jwtGenerator)
            {
                this.userManager = userManager;
                this.signInManager = signInManager;
                this.jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                var result = await signInManager
                    .CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    //generate token : TODO
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
