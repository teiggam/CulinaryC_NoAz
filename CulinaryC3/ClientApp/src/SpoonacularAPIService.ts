import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ingredient } from './Ingredient';
import { WholeFood } from './WholeFood';

//Means this class can be used throughout the whole project
@Injectable({
  providedIn: 'root'
})

export class SpoonacularAPI {
  base: string = "https://api.spoonacular.com";
  key: string = "&apiKey=b3d07c0989f54f82b519701af746acc7";
  key2: string = "&apiKey=4203a2e4b82642a4a6f9a675162cfddf";
  key3: string = "&apiKey=39e0568b19ac443abb1ce2c0ce5f2b64";
  key4: string = "&apiKey=51bf3c7b96844ecf847d1dd25154306b";



  constructor(private http: HttpClient) { }

  SearchForWholeFoods(food: string)
  {
    let url: string = this.base + "/food/ingredients/search?query=" + food +"&number=1&sortDirection=desc"+ this.key3;
    //making sure that the url looks correct
    console.log(url);

    //calling the api and returning a list of foods
    return this.http.get<WholeFood>(url);
  }


  //We are going to take the name and calories and put it in our db
  GetFoodFromId(id: number) {
    let url: string = this.base + "/food/ingredients/" + id + "/information?amount=1&" + this.key4;
    console.log(url);
    return this.http.get<Ingredient>(url);
  }
}
