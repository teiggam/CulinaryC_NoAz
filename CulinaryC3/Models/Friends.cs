using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class Friends
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? FriendId { get; set; }

        public virtual Users User { get; set; }
    }
}
