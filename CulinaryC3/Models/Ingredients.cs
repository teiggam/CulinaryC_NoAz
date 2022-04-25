using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC3.Models
{
    public partial class Ingredients
    {
        public Ingredients()
        {
            RecipeIngredients = new HashSet<RecipeIngredients>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string BaseUnit { get; set; }
        public double? BaseAmount { get; set; }
        public double? Calories { get; set; }
        public double? Carbs { get; set; }
        public double? Protein { get; set; }
        public double? Fats { get; set; }
        public string Aisle { get; set; }

        public virtual ICollection<RecipeIngredients> RecipeIngredients { get; set; }
    }
}
