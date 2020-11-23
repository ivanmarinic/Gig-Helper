using Application.Performers.DTO;
using Application.Sets.DTO;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Application.Songs.DTO
{
    public class SongDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Genre Genre { get; set; }
        public string Text { get; set; }
        public virtual ICollection<SongSetDTO> SongSet { get; set; }
        public virtual ICollection<SongPerformerDTO> SongPerformer { get; set; }
    }
}
