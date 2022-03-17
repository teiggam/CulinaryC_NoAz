using System;
using System.Collections.Generic;


namespace CulinaryC3.Models
{
    public partial class Favorite
    {
        public int Id { get; set; }
        public int? RecipeId { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
    }
}
