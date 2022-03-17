import { Component } from '@angular/core';
import { Favorites } from '../../favorites';
import { FavoritesService } from '../../favorites.service';
import { RecipeService } from '../../RecipeService';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  providers: [UserService, FavoritesService, RecipeService]
})
/** favorites component*/
export class FavoritesComponent {
  userId: number;
  userInfo: string = "";
  fList: Favorites[] = [];
  message: string = "";

  /** favorites ctor */
  constructor(private favoriteService: FavoritesService, private userService: UserService, private recipeService: RecipeService) {
    this.userInfo = localStorage.getItem('userEmail');
      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFavorites(this.userId);
      })
  }

  displayFavorites(id: number) {
    this.favoriteService.getFavorites(id).subscribe((result) => {
      this.fList = result;
      console.log(this.fList);
    })
  }

  removeFavorite(recipeId: number) {
    this.favoriteService.removeFavorite(this.userId, recipeId);
    this.message = "Favorite Removed"
    window.location.reload();
  }
}
