using Application.Performers.DTO;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Performers
{
    public class List
    {
		public class PerformersEnvelope
        {
            public List<PerformerDTO> Performers { get; set; }
            public int PerformersCount { get; set; }
        }
		public class Query : IRequest<PerformersEnvelope>
		{
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

		public class Handler : IRequestHandler<Query, PerformersEnvelope>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<PerformersEnvelope> Handle(Query request,
				CancellationToken cancellationToken)
			{
                var queryable = context.Performers.AsQueryable();

				var performers = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3).ToListAsync();

                return new PerformersEnvelope
                {
                    Performers = mapper.Map<List<Performer>, List<PerformerDTO>>(performers),
                    PerformersCount = queryable.Count()
                };
			}

		}
	}
}
