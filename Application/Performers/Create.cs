﻿using Domain.Entities;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Performers
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var performer = new Performer
                {
                    Id = request.Id,
                    Name = request.Name,
                };

                context.Performers.Add(performer);

                //sca() returns number of saved changes
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem with saving changes!");
            }
        }
    }
}
