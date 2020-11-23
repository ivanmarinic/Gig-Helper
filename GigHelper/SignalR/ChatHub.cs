using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GigHelper.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            command.Username = Context.User?.Claims?.FirstOrDefault(
                x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var comment = await mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }

    }
}
