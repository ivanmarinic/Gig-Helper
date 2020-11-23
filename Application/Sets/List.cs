using Application.Sets.DTO;
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

namespace Application.Sets
{
    public class List
    {
		public class SetsEnvelope
		{
			public List<SetDTO> Sets { get; set; }
			public int SetsCount { get; set; }
		}
		public class Query : IRequest<SetsEnvelope>
		{
			public Query(int? limit, int? offset)
			{
				Limit = limit;
				Offset = offset;
			}
			public int? Limit { get; set; }
			public int? Offset { get; set; }
		}

		public class Handler : IRequestHandler<Query, SetsEnvelope>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<SetsEnvelope> Handle(Query request,
				CancellationToken cancellationToken)
			{
				var queryable = context.Sets.AsQueryable();

				var sets = await queryable
					.Skip(request.Offset ?? 0)
					.Take(request.Limit ?? 3)
					.ToListAsync();

				return new SetsEnvelope
				{
					Sets = mapper.Map<List<Set>, List<SetDTO>>(sets),
					SetsCount = queryable.Count()
				};
			}
		}
	}
}
