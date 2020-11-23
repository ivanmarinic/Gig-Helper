using Application.Errors;
using Domain.Entities;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Songs
{
    public class Edit
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

                var song = await context.Songs.FindAsync(request.Id);

                var songArray = song.SongPerformer.ToArray();
                var songSetArray = song.SongSet.ToArray();

                if (song == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Song = "Not found!" });

                
                //optional edits
                song.Name = request.Name ?? song.Name;
                song.Genre = request.Genre;
                song.Text = request.Text ?? song.Text;


                if (songArray[0].PerformerId != request.SongPerformer[0].Performer.Id)
                {
                    var removeObject = song.SongPerformer.ToArray().ElementAt(0);
                    song.SongPerformer.Remove(removeObject);


                    var songPerformer = new SongPerformer
                    {
                        SongId = song.Id,
                        PerformerId = request.SongPerformer[0].Performer.Id,
                    };

                    song.SongPerformer.Add(songPerformer);
                }

                if (songSetArray[0].SetId != request.SongSet[0].Set.Id)
                {
                    var removeObject = song.SongSet.ToArray().ElementAt(0);
                    song.SongSet.Remove(removeObject);


                    var songSet = new SongSet
                    {
                        SongId = song.Id,
                        SetId = request.SongSet[0].Set.Id,
                    };

                    song.SongSet.Add(songSet);
                }

                //song.SongPerformer = request.SongPerformer ?? song.SongPerformer;
                //song.SongSet = request.SongSet ?? song.SongSet;


                //sca() returns number of saved changes
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;

                throw new Exception("Problem with saving changes!");
            }
        }
    }
}
