import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ingredient } from './Ingredient';
import { DBIngredient} from './DBIngredient';
import { Recipe } from './Recipe';
import { WholeFood } from './WholeFood';



@Injectable()
export class RecipeService {
  base: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Recipe";
  }

  getRecipes() {
    let url: string = this.base + "/All";
    return this.http.get<Recipe[]>(url);
  }


  displayUserRecipes(userId : number) {
    let url: string = this.base + `/id=${userId}`;
    return this.http.get<Recipe[]>(url);
  }
  
  getRecipeById(id: number) {
    let url: string = this.base + "/FindRecipe/Id=" + id;
    return this.http.get<Recipe>(url);

  }

  getIngredients() {
    let url: string = this.base + "/Ingredients/All";
    return this.http.get<DBIngredient[]>(url);
  }

  getRecipesByIngName(ingName: string) {
    let url: string = this.base + "/getRecipesByIngName=" + ingName;
    return this.http.get<Recipe[]>(url);
  }

  addIngredient(newIng: DBIngredient) {
    console.log(newIng.item);
    let url: string = this.base + "/Ingredients/Add";
    return this.http.post(url, {
      recipeId: newIng.recipeId,
      item: newIng.item,
      amount: newIng.amount,
      calories: newIng.calories,
      carbs: newIng.carbs,
      protein: newIng.protein,
      fats: newIng.fats,
      aisle: newIng.aisle,
      unit: newIng.unit
    })
      .subscribe(result => { console.log(result) });
  }


  addRecipe(title: string, userId: number) {
    let url: string = this.base + `/Add/T=${title}&U=${userId}`
    this.http.post(url, {}).subscribe(result=> {console.log(result)})
  }

  searchRecipeByName(name: string){
    let url: string = this.base + `/search/N=${name}`;
    return this.http.get<Recipe[]>(url);
  }

  getRecipeByName(name: string) {
    let url: string = this.base + `/N=${name}`;
    return this.http.get<Recipe>(url);
  }

  updateRecipe(name: string, desc: string, serv: number, image: string ) {

    let url: string = this.base + `/Update/N=${name}/D=${desc}/S=${serv}/I=${image}`;
    return this.http.put<Recipe>(url, {});
  }

  updateScore(recipeId: number) {
    let url: string = this.base + `/updateScore=${recipeId}`;
    return this.http.put<Recipe>(url, {}).subscribe((result) => console.log(result));
  }

  removeScore(recipeId: number) {
    let url: string = this.base + `/removescore=${recipeId}`;
    return this.http.put<Recipe>(url, {}).subscribe((result) => console.log(result));
  }

  deleteRecipe(recipeId: number) {
    let url: string = this.base + `/deleteRecipe=${recipeId}`;
    return this.http.delete<Recipe>(url, {}).subscribe((result) => console.log(result));
  }
}
