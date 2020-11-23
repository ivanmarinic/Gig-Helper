using Application.Songs;
using Application.Songs.DTO;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class SongsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.SongsEnvelope>> ListSongs(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SongDTO>> GetSong(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateSong(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteSong(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id } );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditSong(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        /*[HttpGet("{searchTerm}")]
        public async Task<ActionResult<SongDTO>> GetSongByName(string searchterm)
        {
        }*/
    }
}
