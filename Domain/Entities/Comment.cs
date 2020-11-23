using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        //lazy loading
        public virtual AppUser Author { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
