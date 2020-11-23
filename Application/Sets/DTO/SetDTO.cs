using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Application.Sets.DTO
{
    public class SetDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<SongSet> SongSet { get; set; }
    }
}
