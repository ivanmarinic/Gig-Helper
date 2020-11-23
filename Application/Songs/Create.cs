using Domain;
using Domain.Entities;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Drawing;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Songs
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public Genre Genre { get; set; }
            public string Text { get; set; }
            public SongSet[] SongSet { get; set; }
            public SongPerformer[] SongPerformer { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Genre).NotEmpty();
                RuleFor(x => x.Text).NotEmpty();
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
                var songSet = new SongSet[]
                {
                    new SongSet{
                        SongId = request.Id,
                        SetId = request.SongSet[0].Set.Id,
                    }
                };

                var songPerformer = new SongPerformer[]
                {
                    new SongPerformer{
                        SongId = request.Id,
                        PerformerId = request.SongPerformer[0].Performer.Id,
                    }
                };

                var song = new Song
                {
                    Id = request.Id,
                    Name = request.Name,
                    Genre = request.Genre,
                    Text = request.Text,
                    SongSet = songSet,
                    SongPerformer = songPerformer,
                };

                context.Songs.Add(song);

                //var user = await context.Users.SingleOrDefaultAsync(x => x.UserName == userAccessor.GetCurrentUsername());

                //var set = await context.Sets.SingleOrDefaultAsync(x => x.Id.Equals("271515c0-45e8-4a74-8fa5-01b4bd85fc3a"));


                /*var songSet = new SongSet
                {
                    Set = request.SongSet[0].Set,
                };

                context.SongSet.Add(songSet);
                */
                //sca() returns number of saved changes
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem with saving changes!");
            }
        }
    }
}
