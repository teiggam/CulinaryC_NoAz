import { Component } from '@angular/core';
import { SpoonacularAPI } from '../../SpoonacularAPIService';
import { WholeFood } from '../../WholeFood';
import { Ingredient } from '../../Ingredient';
import { RecipeService } from 'src/RecipeService';
import { Recipe } from 'src/Recipe';
import { DBIngredient } from 'src/DBIngredient';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../../UserService';
import { UploadService } from '../upload.service';
import { Console } from 'console';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [SpoonacularAPI, RecipeService, UserService]
})
/** AddRecipe component*/
export class AddRecipeComponent {
  wf: WholeFood;
  ing: Ingredient;
  ing2: Ingredient;
  foodId: number;
  rList: Recipe[];
  iList: DBIngredient[] = [];
  r: Recipe;
  r1: Recipe;
  rec: Recipe;
  //this holds the users email
  userInfo: string;
  //this holds the userId
  userId: number;
  ozCon: number = 28.3495;
  cupCon: number = 128;
  lbCon: number = 453.592;
  tbspCon: number = 14.3;
  tspCon: number = 4.2
  amount: number;
  unit: string;
  recName: string;
  dbIng: DBIngredient;
  userIngredient: DBIngredient;
  fileToUpload: File = null;
  response: { dbPath: '' }
  ste4: boolean = false;
  ste5: boolean = false;
  ste6: boolean = false;
  ste7: boolean = false;
  ste8: boolean = false;
  ste9: boolean = false;
  ste10: boolean = false;
  des: string = "";
  imageName: string = "";
  sas = "sp=rac&st=2021-08-11T17:11:10Z&se=2021-09-09T01:11:10Z&spr=https&sv=2020-08-04&sr=c&sig=sh8RQD%2BL6gUEL7P9iMJaddZ6jRKu%2FxZajWbhts73MGI%3D"
  message: string;
  serv: number;

  constructor(private SpoonApi: SpoonacularAPI, private recServ: RecipeService, private userService: UserService, private blobService: UploadService) {
    //will get the userName / Email from the login of identity
    this.userInfo = localStorage.getItem('userEmail');
    //this takes the email and finds the userId connected to it
    userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.userId = id.id;
      console.log(this.userId);
    })

    console.log(this.iList);

  }
  //Searches API and returns the ID number of ingredient
  SearchIngredient(food: string) {
    console.log(food);
    this.SpoonApi.SearchForWholeFoods(food).subscribe((WholeFood) => {
        this.wf = WholeFood;
      if (this.wf.results.length == 0 || WholeFood == null || WholeFood == undefined) {
        this.message = 'That ingredient could not be found, please try again.'
      }
      else {
        this.message = 'Ingredient found!'
        this.foodId = this.wf.results[0].id;
        this.GetIngredient(this.foodId);
      }
    });
  }
  //Pulls ingredient from list using ID from above, to access all details
  GetIngredient(id: number): any {
    this.SpoonApi.GetFoodFromId(id).subscribe((Ingredient) => {
      this.ing = Ingredient;
      console.log(this.ing);
      return this.ing;
    });
  }
  //Adds new recipe, only entering the title, to later be modified.
  AddRecipe(title: string) {
    this.rec = {
      id: null,
      recipeName: title,
      userId: this.userId,
      score: 0,
      description: null,
      user: null,
      favorite: null,
      ingredients: null,
      servings: null,
      picture: null
    };
    this.recServ.addRecipe(title, this.userId);
    return this.rec;
  }
  ConfirmTitle(title: string) {
    document.getElementById("confirm").innerHTML = `<h2>${title}</h2>`;
    this.recName = title;
  }
  ConfirmRecipe() {
    document.getElementById("recipe").innerHTML = "<h3>Your recipe has been submitted</h3> <br> <a href='all-recipes'>View All Recipes</a>";
  }
  ConfirmDir(){
    document.getElementById("dir").innerHTML = "<h3>Directions have been added!</h3>";
  }
  AddToIngArray(form: NgForm) {
    this.dbIng = {
      id: null,
      recipeId: null,
      item: null,
      amount: null,
      unit: null,
      calories: null,
      carbs: null,
      protein: null,
      fats: null,
      aisle: null
    }
    this.recServ.getRecipeByName(this.recName).subscribe((Recipe2) => {
      let r2: Recipe = Recipe2;
      this.dbIng.recipeId = r2.id;
      console.log(this.unit);
    })
    this.amount = form.form.value.amount;
    this.unit = form.form.value.unit;
    if (this.unit === 'oz') {
      this.ConvertUnits(this.ozCon);
    }
    else if (this.unit === 'tsp') {
      this.ConvertUnits(this.tspCon);
    }
    else if (this.unit === 'tbsp') {
      this.ConvertUnits(this.tbspCon);
    }
    else if (this.unit === 'cup') {
      this.ConvertUnits(this.cupCon);
    }
    if (this.unit === 'lb') {
      this.ConvertUnits(this.lbCon);
    }
    this.dbIng.aisle = this.ing.aisle;
    this.dbIng.amount = this.amount;
    this.dbIng.unit = this.unit;
    this.dbIng.item = this.ing.name;
    this.iList.push(this.dbIng);

  }
  ConvertUnits(unitCon: number) {
    for (var k = 0; k < this.ing.nutrition.nutrients.length; k++) {
      if (this.ing.nutrition.nutrients[k].name === 'Carbohydrates') {
        let carb: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.carbs = carb;
      }
      if (this.ing.nutrition.nutrients[k].name === 'Fat') {
        let fat: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.fats = fat;
      }
      if (this.ing.nutrition.nutrients[k].name === 'Protein') {
        let prot: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.protein = prot;
      }
      if (this.ing.nutrition.nutrients[k].name === 'Calories') {
        let cal: number = (this.ing.nutrition.nutrients[k].amount / this.ing.nutrition.weightPerServing.amount) * unitCon * this.amount;
        this.dbIng.calories = cal;
      }
    }
  }
  AddIngredientsToDB() {
    for (var a = 0; a < this.iList.length; a++) {
      this.recServ.addIngredient(this.iList[a]);
    }
  }
  RemoveIngredient(index: number) {
    this.iList.splice(index, 1);
  }
  UpdateRecipe(form: NgForm) {
    if(form.form.value.servings !== null){
      this.serv = form.form.value.servings;
    }
    else{
      this.serv = 1;
    }
    let newPath: string = this.response.dbPath.slice(17);

    this.recServ.updateRecipe(this.recName, this.des, this.serv, newPath)
      .subscribe();
  }


  //Let the user add their own ingredients
  //create a new ingredient object
  //add that new ingredient object to the array
  AddUserIngredient(form: NgForm) {

    this.recServ.getRecipeByName(this.recName).subscribe((Recipe2) => {
      let r2: Recipe = Recipe2;

      this.userIngredient = {
        id: null,
        recipeId: r2.id,
        item: form.form.value.userIng,
        amount: form.form.value.amount,
        unit: form.form.value.unit,
        calories: form.form.value.calories,
        carbs: form.form.value.carbs,
        protein: form.form.value.protein,
        fats: form.form.value.fats,
        aisle: null
      }

      //add new ingredient to array
      console.log(this.userIngredient);
      console.log(this.userIngredient.calories);
      this.iList.push(this.userIngredient);
    })
  }

 imageSelected(file: File) {
    console.log(file.name);
    this.blobService.uploadImage(this.sas, file, file.name, () => {
      console.log(file.name);
      this.imageName = file.name;
    })
  }
  uploadFinished = (event) => {
    this.response = event;
  }

  step4() {
    this.ste4 = true;
  }

  step5() {
    this.ste5 = true;
  }

  step6() {
    this.ste6 = true;
  }

  step7() {
    this.ste7 = true;
  }

  step8() {
    this.ste8 = true;
  }

  step9() {
    this.ste9 = true;
  }

  step10() {
    this.ste10 = true;
  }

  AddString(form: NgForm) {
    this.des = form.form.value.step1 + "*" + form.form.value.step2 + "*" + form.form.value.step3 + "*" + form.form.value.step4 + "*" +
      form.form.value.step5 + "*" + form.form.value.step6 + "*" + form.form.value.step7 + "*" + form.form.value.step8 + "*" + form.form.value.step9 + "*" +
      form.form.value.step10;
  }


}

