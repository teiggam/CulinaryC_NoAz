import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../../Recipe';
import { RecipeofDay } from '../../RecipeofDay';
import { RecipeService } from '../../RecipeService';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css'],
  providers: [UserService, RecipeService]
})
export class HomeComponent {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  recipeString: string;
  recipeDay: RecipeofDay;
  recipe: Recipe[];
  num: number;
  realRecipe: Recipe;



  constructor(private userService: UserService, private recipeService: RecipeService) {
    this.recipe = null;
    let day = new Date();
    this.recipeDay = JSON.parse(localStorage.getItem('recipeDay'));
    console.log(this.recipeDay);
    if (this.recipeDay === null || this.recipeDay.dayofMonth === null || this.recipeDay.dayofMonth === day.getDate()) {
      this.userService.recipeday().subscribe((r) => {
        this.recipeDay = r
        console.log(this.recipeDay);
        localStorage.setItem('recipeDay', JSON.stringify(r));
      });
    } else if (this.recipeDay.dayofMonth === 31 && day.getDate() === 1 || this.recipeDay.dayofMonth === 32 && day.getDate() === 1 || this.recipeDay.dayofMonth === 29 && day.getDate() === 1) {
      this.userService.recipeday().subscribe((r) => {
        this.recipeDay = r
        console.log(this.recipeDay);
        localStorage.setItem('recipeDay', JSON.stringify(r));
      });
    }
    this.getRecipe();
  }
  ngOnInit() {
  }
  getRecipe() {
    this.recipe = [];
    this.recipeService.getRecipes().subscribe((result2) => {
      try
      {
        this.num = this.recipeDay.recipeId
        console.log(this.num);
      }
      catch (exception)
      {
        this.num = 0;
        console.log(this.num);
      }
      for (var i = 0; i < result2.length; i++) {
        console.log(result2[i]);
        if (result2[i].id === this.num)
        {
          this.recipe.push(result2[i]);
        } 
      }

      console.log(this.recipe)
      if (this.recipe.length == null || this.recipe.length == 0)
      {
        this.userService.recipeday().subscribe((r) => {
          this.recipeDay = r
          console.log(this.recipeDay);
          localStorage.setItem('recipeDay', JSON.stringify(r));
          this.getRecipe();
        });
      }
      else
      {
        this.realRecipe = this.recipe[0];
        console.log(this.realRecipe);
      }
    })
  }
}

