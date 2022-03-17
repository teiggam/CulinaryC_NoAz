using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Models
{
    public partial class Friend
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? FriendId { get; set; }

        public virtual User User { get; set; }
    }
}
