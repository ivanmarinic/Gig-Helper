using Application.Songs.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Performers.DTO
{
    public class SongPerformerDTO
    {
        public virtual PerformerDTO Performer { get; set; }
    }
}
