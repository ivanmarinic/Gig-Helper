using Application.Errors;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Songs
{
    public class Details
    {
		public class Query : IRequest<DTO.SongDTO>
		{
            public Guid Id { get; set; }
        }

		public class Handler : IRequestHandler<Query, DTO.SongDTO>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<DTO.SongDTO> Handle(Query request,
				CancellationToken cancellationToken)
			{
				var song = await context.Songs.FindAsync(request.Id);

				if(song == null)
					throw new RestException(HttpStatusCode.NotFound, new { Song = "Not found!" });

				return mapper.Map<Song, DTO.SongDTO>(song);
			}

		}
	}
}
