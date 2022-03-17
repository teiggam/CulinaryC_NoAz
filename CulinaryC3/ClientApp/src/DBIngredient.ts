export interface DBIngredient {
  id: number;
  recipeId: number;
  item: string;
  amount: number;
  unit: string;
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  aisle: string;


}
