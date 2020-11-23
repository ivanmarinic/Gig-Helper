using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Sets;
using Application.Sets.DTO;

namespace GigHelper.Controllers
{
    public class SetsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.SetsEnvelope>> ListSets(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SetDTO>> GetSet(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateSet(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteSet(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditSet(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}
