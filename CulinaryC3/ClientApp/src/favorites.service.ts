import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Favorites } from './favorites';

@Injectable()
export class FavoritesService {
  base: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base = baseUrl + "Culinary";
  }

  getFavorites(id: number) {
    let url: string = this.base + `/userfavorites=${id}`;
    return this.http.get<Favorites[]>(url);
  }

  addFavorite(userId: number, recipeId: number) {
    let url: string = this.base + `/addfav/u=${userId}&r=${recipeId}`;
    return this.http.post<Favorites>(url, {}).subscribe((result) => console.log(result));
  }

  removeFavorite(userId: number, recipeId: number) {
    let url: string = this.base + `/removefav/u=${userId}&r=${recipeId}`;
    return this.http.delete<Favorites>(url, {}).subscribe((result) => console.log(result));
  }

  checkFavs(userId: number, recipeId: number) {
    let url: string = this.base + `/checkFavs=${userId}&f=${recipeId}`;
    return this.http.get<Favorites[]>(url);
  }

  
}




