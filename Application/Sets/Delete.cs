using Application.Errors;
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
    public class Delete
    {
		public class Command : IRequest
		{
			public Guid Id { get; set; }
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
				var set = await context.Sets.FindAsync(request.Id);

				if (set == null)
					throw new RestException(HttpStatusCode.NotFound, new { Song = "Not found!" });

				context.Remove(set);

				var success = await context.SaveChangesAsync() > 0;

				if (success) return Unit.Value;

				throw new Exception("Problem saving changes!");
			}

		}
	}
}
