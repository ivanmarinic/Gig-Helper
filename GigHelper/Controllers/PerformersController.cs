using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Performers;
using Domain.Entities;
using MediatR;
using Application.Performers.DTO;

namespace GigHelper.Controllers
{
    public class PerformersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.PerformersEnvelope>> ListPerformers(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PerformerDTO>> GetPerformer(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreatePerformer(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeletePerformer(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditPerformer(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}
