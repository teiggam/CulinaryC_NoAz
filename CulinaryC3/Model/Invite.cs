using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Model
{
    public partial class Invite
    {
        public int Id { get; set; }
        public string NameofGroup { get; set; }
        public int? InviteeId { get; set; }
        public string InviterEmail { get; set; }
    }
}
