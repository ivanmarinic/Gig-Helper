using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class SongPerformer
    {
        public Guid SongId { get; set; }
        public virtual Song Song { get; set; }
        public Guid PerformerId { get; set; }
        public virtual Performer Performer { get; set; }
    }
}
