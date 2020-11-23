using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Persistence;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Application.Songs.DTO;
using AutoMapper;
using System.Linq;

namespace Application.Songs
{
    public class List
    {
		public class SongsEnvelope
		{
			public List<SongDTO> Songs { get; set; }
			public int SongsCount { get; set; }
		}
		public class Query : IRequest<SongsEnvelope>
		{
			public Query(int? limit, int? offset)
			{
				Limit = limit;
				Offset = offset;
			}
			public int? Limit { get; set; }
			public int? Offset { get; set; }
		}

		public class Handler : IRequestHandler<Query, SongsEnvelope>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<SongsEnvelope> Handle(Query request,
				CancellationToken cancellationToken)
			{
				var queryable = context.Songs.AsQueryable();

				var songs = await queryable
					.Skip(request.Offset ?? 0)
					.Take(request.Limit ?? 3)
					.ToListAsync();

				return new SongsEnvelope
				{
					Songs = mapper.Map<List<Song>, List<SongDTO>>(songs),
					SongsCount = queryable.Count()
				};
			}

		}

	}
}
