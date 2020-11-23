using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Set
    {
        public Guid Id { get; set; }
        [Required, StringLength(80)]
        public string Name { get; set; }
        public virtual ICollection<SongSet> SongSet { get; set; }
    }
}
