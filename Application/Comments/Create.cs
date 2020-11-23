using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly IMapper mapper;
            private readonly DataContext context;

            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<CommentDto> Handle(Command request, 
                CancellationToken cancellationToken)
            {

                //we can't use IAccessor because we're not using Http requests for SignalR
                //we're using web sockets
                var user = await context.Users.SingleOrDefaultAsync(x =>
                x.UserName == request.Username);

                var comment = new Comment
                {
                    Author = user,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                context.Comments.Add(comment);

                //sca() returns number of saved changes
                var success = await context.SaveChangesAsync() > 0;

                //if we Remove(), it'll return an empty object and that won't throw 
                //exception
                if (success)
                    return mapper.Map<CommentDto>(comment);

                throw new Exception("Problem with saving changes!");
            }
        }
    }
}
