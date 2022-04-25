using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int? UserId { get; set; }
        public bool? Admin { get; set; }
        public int? Score { get; set; }

        public virtual Users User { get; set; }
    }
}
