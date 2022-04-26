using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CulinaryC3.Models
{
    public class IngData
    {
        public int Id { get; set; }
        public int? RecipeID { get; set; }
        public string Name { get; set; }
        public double? BaseAmount { get; set; }
        public string BaseUnit { get; set; }
        public double? AmountUsed { get; set; }
        public string InputUnit { get; set; }
        public double? Calories { get; set; }
        public double? Carbs { get; set; }
        public double? Protein { get; set; }
        public double? Fats { get; set; }
        public string Aisle { get; set; }
    }
}
