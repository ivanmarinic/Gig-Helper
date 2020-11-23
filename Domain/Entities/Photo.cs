using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}
