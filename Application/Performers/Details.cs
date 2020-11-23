using Application.Errors;
using Application.Performers.DTO;
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

namespace Application.Performers
{
    public class Details
    {
		public class Query : IRequest<PerformerDTO>
		{
			public Guid Id { get; set; }
		}

		public class Handler : IRequestHandler<Query, PerformerDTO>
		{
			private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
			{
				this.context = context;
                this.mapper = mapper;
            }

			public async Task<PerformerDTO> Handle(Query request,
				CancellationToken cancellationToken)
			{
				var performer = await context.Performers.FindAsync(request.Id);

				if (performer == null)
					throw new RestException(HttpStatusCode.NotFound, new { Song = "Not found!" });

				return mapper.Map<Performer, PerformerDTO>(performer);
			}

		}
	}
}
