using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class SongSet
    {
        public Guid SongId { get; set; }
        public virtual Song Song { get; set; }
        public Guid SetId { get; set; }
        public virtual Set Set { get; set; }
    }
}
