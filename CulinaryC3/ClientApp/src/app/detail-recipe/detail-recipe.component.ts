import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBIngredient } from '../../DBIngredient';
import { Ingredient } from '../../Ingredient';
import { Recipes } from '../../Recipes';
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
  r: Recipes;
  u: User[];
  dbIngList: DBIngredient[] = [];
  message: string | null = null;
  userId: number;
  userInfo: string = "";
  id: number;
  des: string[] = [];
  fullDes: string[] = [];
  calories: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fats: number = 0;
  i: number;
  ozCon: number = 28.3495;
  cupCon: number = 128;
  lbCon: number = 453.592;
  tbspCon: number = 14.3;
  tspCon: number = 4.2
  unitCon: number;



  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private UserServ: UserService, private route: ActivatedRoute) {

    this.UserServ.leaderboard().subscribe((User) => {
      this.u = User; console.log(this.u);
    })
    this.id = + this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.GetRecipeById(this.id);
  }

  ngOnInit(): void {

  }


  CalculatePerServing() {
    this.calories = this.calories / this.r.servings;
    this.carbs = this.carbs / this.r.servings;
    this.protein = this.protein / this.r.servings;
    this.fats = this.fats / this.r.servings;
  }

  async GetRecipeById(id: number) {

    await this.recServ.getRecipeById(id).subscribe((Recipe) => {
      console.log(Recipe);
      this.GetDescription(Recipe);

      this.recServ.getIngredientDetails(Recipe.id).subscribe((AllIngredients) => {
      this.dbIngList = AllIngredients;
      console.log(this.dbIngList);
    });

    this.ConvertMacros().then(this.CalculatePerServing);

    });
  }

  ConvertMacros() {

    return new Promise((resolve, reject) => {

    this.dbIngList.forEach(function (ing: DBIngredient) {

      /** Need to set unit conversion*/
      switch (ing.InputUnit) {
        case 'oz':
          this.unitCon = this.ozCon;
          break;
        case 'cup':
          this.unitCon = this.cupCon;
          break;

        case 'lb':
          this.unitCon = this.lbCon;
          break;

        case 'tsp':
          this.unitCon = this.tspCon;
          break;

        case 'tbsp':
          this.unitCon = this.tbspCon;
          break;

        default:
          this.unitCon = 1;
          break;
      }
      let carb: number = (ing.carbs / ing.baseamount) * this.unitCon * ing.AmountUsed;
      this.carbs = carb;

      let fat: number = (ing.fats / ing.baseamount) * this.unitCon * ing.AmountUsed;
      this.fats = fat;

      let prot: number = (ing.protein / ing.baseamount) * this.unitCon * ing.AmountUsed;
      this.protein = prot;

      let cal: number = (ing.calories / ing.baseamount) * this.unitCon * ing.AmountUsed;
      this.calories = cal;

      resolve();
    })

    });
  }


  GetDescription(rec: Recipes) {
    this.des = rec.description.split("*");
    for (var i = 0; i < this.des.length; i++) {
      if (this.des[i].toLowerCase() !== "undefined") {
        this.fullDes.push(this.des[i]);
      }
    }

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
