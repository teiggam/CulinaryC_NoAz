using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Model
{
    public partial class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int? UserId { get; set; }
        public bool? Admin { get; set; }
        public int? Score { get; set; }

        public virtual User User { get; set; }
    }
}
