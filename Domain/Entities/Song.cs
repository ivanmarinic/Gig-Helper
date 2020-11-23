using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Song
    {
        public Guid Id { get; set; }
        [Required, StringLength(80)]
        public string Name { get; set; }
        public Genre Genre { get; set; }
        [Required, StringLength(1000)]
        public string Text { get; set; }
        public virtual ICollection<SongSet> SongSet { get; set; }
        public virtual ICollection<SongPerformer> SongPerformer { get; set; }
    }
}
