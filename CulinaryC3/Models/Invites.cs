using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class Invites
    {
        public int Id { get; set; }
        public string NameofGroup { get; set; }
        public int? InviteeId { get; set; }
        public string InviterEmail { get; set; }
    }
}
