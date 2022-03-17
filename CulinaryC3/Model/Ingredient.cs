using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Model
{
    public partial class Ingredient
    {
        public int Id { get; set; }
        public int? RecipeId { get; set; }
        public string Item { get; set; }
        public double? Amount { get; set; }
        public string Unit { get; set; }
        public double? Calories { get; set; }
        public double? Carbs { get; set; }
        public double? Protein { get; set; }
        public double? Fats { get; set; }
        public string Aisle { get; set; }

        public virtual Recipe Recipe { get; set; }
    }
}
