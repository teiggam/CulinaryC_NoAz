using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class RecipeIngredients
    {
        public int Id { get; set; }
        public int? RecipeId { get; set; }
        public int? IngredientId { get; set; }
        public double? AmountUsed { get; set; }
        public string InputUnit { get; set; }

        public virtual Ingredients Ingredient { get; set; }
        public virtual Recipes Recipe { get; set; }
    }
}
