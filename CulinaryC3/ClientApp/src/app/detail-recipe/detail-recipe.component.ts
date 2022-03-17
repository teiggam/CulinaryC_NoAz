import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBIngredient } from '../../DBIngredient';
import { Ingredient } from '../../Ingredient';
import { Recipe } from '../../Recipe';
import { RecipeService } from '../../RecipeService';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css'],
  providers: [SpoonacularAPI, RecipeService, UserService]
})

/** detail-recipe component*/
export class DetailRecipeComponent {
  foodId: number = {} as number;
  r: Recipe = {} as Recipe;
  u: User[];
  dbIngList: DBIngredient[] = [];
  message: string | null = null;
  userId: number;
  userInfo: string = "";
  id: number;
  des: string[] = [];
  fullDes: string[] = [];
  ingUsed: DBIngredient[] = [];
  calories: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fats: number = 0;
  i: number;

  constructor( private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private UserServ: UserService, private route: ActivatedRoute) {

    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u);
    })
    this.id = + this.route.snapshot.paramMap.get('id');
    this.GetRecipeById(this.id);
  }

  ngOnInit(): void {

  }

  GetNutritional() {
    for (let ing of this.dbIngList) {
      if (ing.recipeId === this.r.id) {
        this.ingUsed.push(ing)
      }
    }
    for (this.i = 0; this.i <= this.ingUsed.length; this.i++) {
      this.calories = this.calories + (this.ingUsed[this.i].calories);
      this.carbs = this.carbs + (this.ingUsed[this.i].carbs);
      this.protein = this.protein + (this.ingUsed[this.i].protein);
      this.fats = this.fats + (this.ingUsed[this.i].fats);
      console.log(this.fats);
      console.log(this.i)
      console.log(this.ingUsed.length)
      if (this.i === this.ingUsed.length - 1) {
        this.divide()
      }
    }

  }

  divide() {
    console.log("AHH")
    this.calories = this.calories / this.r.servings;
    this.carbs = this.carbs / this.r.servings;
    this.protein = this.protein / this.r.servings;
    this.fats = this.fats / this.r.servings;
  }

  GetRecipeById(id: number) {
    this.recServ.getRecipeById(id).subscribe((Recipe) => {
      this.r = Recipe;
      console.log(this.r);

      this.des = this.r.description.split("*");
      for (var i = 0; i < this.des.length; i++) {
        if (this.des[i].toLowerCase() !== "undefined") {
          this.fullDes.push(this.des[i]);
        }
      }
    });
    this.recServ.getIngredients().subscribe((DBIngredient) => {
      this.dbIngList = DBIngredient;
      this.GetNutritional();
    })
  }

  GetUsers() {
    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u)
      return this.u;
    })
  }

  completed(recipeId: number) {
    this.message = "Recipe Complete +5 points!"
    console.log(this.message);
    this.userInfo = localStorage.getItem('userEmail');
    this.UserServ.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.userId = id.id;
      console.log(this.userId);
      this.UserServ.completeRecipe(this.userId);
    })

    console.log(recipeId);
    this.recServ.updateScore(recipeId);
  }


}


