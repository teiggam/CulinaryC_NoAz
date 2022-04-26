export interface DBIngredient {
  id: number,
  recipeId: number,
  name: string,
  baseamount: number,
  baseunit: string,
  AmountUsed: number,
  InputUnit: string,
  calories: number,
  carbs: number,
  protein: number,
  fats: number,
  aisle: string
}
