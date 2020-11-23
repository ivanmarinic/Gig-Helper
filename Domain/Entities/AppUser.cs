using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            Photos = new Collection<Photo>();
        }

        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}
