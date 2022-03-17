using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Model
{
    public partial class Recipe
    {
        public Recipe()
        {
            Ingredients = new HashSet<Ingredient>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? Score { get; set; }
        public string Description { get; set; }
        public string RecipeName { get; set; }
        public int? Servings { get; set; }
        public string Picture { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Ingredient> Ingredients { get; set; }
    }
}
