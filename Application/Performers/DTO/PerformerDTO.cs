using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Performers.DTO
{
    public class PerformerDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<SongPerformer> SongPerformer { get; set; }
    }
}
