using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class Recipes
    {
        public Recipes()
        {
            RecipeIngredients = new HashSet<RecipeIngredients>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? Score { get; set; }
        public string Description { get; set; }
        public string RecipeName { get; set; }
        public int? Servings { get; set; }
        public string Picture { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<RecipeIngredients> RecipeIngredients { get; set; }
    }
}
