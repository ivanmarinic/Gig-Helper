using Application.Errors;
using Application.Sets.DTO;
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

namespace Application.Sets
{
    public class Details
    {
		public class Query : IRequest<SetDTO>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Query, SetDTO>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<SetDTO> Handle(Query request,
				CancellationToken cancellationToken)
			{
				var song = await context.Sets.FindAsync(request.Id);

				if (song == null)
					throw new RestException(HttpStatusCode.NotFound, new { Set = "Not found!" });

				return mapper.Map<Set, SetDTO>(song);
			}

		}
	}
}
