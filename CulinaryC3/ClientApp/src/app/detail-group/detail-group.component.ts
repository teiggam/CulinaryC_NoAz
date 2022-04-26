import { Component } from '@angular/core';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';
import { FriendsService } from '../../Friends.service';
import { Friends } from '../../Friends';
import { User } from '../../User';
import { InvitesService } from '../../invites.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../RecipeService';
import { Recipes } from '../../Recipes';
import { FavoritesService } from '../../favorites.service';
import { Favorites } from '../../favorites';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.css'],
  providers: [GroupService, UserService, FriendsService, InvitesService, RecipeService, FavoritesService]
})

/** detail-group component*/
export class DetailGroupComponent {
  userInfo: string = "";
  userId: number;
  groupList: Group[] = [];
  fList: Friends[] = [];
  userList: User[] = [];
  allUsers: User[]
  message: string | null = null;
  gList: User[] = [];
  id: number;
  group: Group;
  groupName: string;
  groupUsers: Group[];
  i: number;
  recipes: Recipes[];
  allRecipes: Recipes[] = [];
  recipe: Favorites[] = [];
  Users: User[] = [];

  constructor(private groupService: GroupService, private UserService: UserService,
    private friendsService: FriendsService, private invitesService: InvitesService, private route: ActivatedRoute, private recipeServices: RecipeService, private favoriteService: FavoritesService) {
    this.id = + this.route.snapshot.paramMap.get('id');
    this.UserService.leaderboard().subscribe((User) => {
      this.allUsers = User;
    })

    this.userInfo = localStorage.getItem('userEmail');
    UserService.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.userId = id.id;
      console.log(this.userId);

      favoriteService.getFavorites(this.userId).subscribe((result2) => {
        console.log(result2)


        for (var i = 0; i < result2.length; i++) {
          favoriteService.checkFavs(this.userId, result2[i].id).subscribe((f) => {
            this.recipe.push(f[i]);

            for (let i = 0; i < this.recipe.length; i++) {
              console.log(f[i].recipeId);
              document.getElementById(f[i].recipeId.toString()).innerHTML
                = "<img id='i' class='favButton' src = 'star.png' />";
            }
          })
        }
        console.log(this.recipe)

      })
    })

  }

  ngOnInit(): void {
    this.getGroup(this.id);
    /*this.getGroup(this.id);*/
    //this part is not working
    //this.getAllUsersInGroup();
    //for (this.i = 0; this.i <= this.groupUsers.length; this.i++) {
    //  this.getRecipes(this.groupUsers[this.i])
    /* }*/
  }

  favorite(recipeId: number) {

    let recipe2: Favorites[] = [];
    let recipe3: number = -1;
    let recipe4: number = -2;

    let message1: boolean = false;

    this.favoriteService.getFavorites(this.userId).subscribe((result2) => {
      console.log(result2);


      for (var i = 0; i < result2.length; i++) {
        console.log(result2[i].id);
        if (result2[i].id == recipeId) {

          recipe3 = result2[i].id;
          recipe4 = result2[i].id;
        }
      }
      console.log(recipe2);
      console.log(recipe3);

      if (recipe3 === recipe4) {
        message1 = true;
      }
      console.log(message1);

      if (message1 === false) {
        this.addPoints(recipeId);
        this.favoriteService.addFavorite(this.userId, recipeId);
        document.getElementById(recipeId.toString()).innerHTML
          = "<img id='i' class='favButton' src = 'star.png' />";
      }
      else if (message1 === true) {
        this.favoriteService.removeFavorite(this.userId, recipeId);
        //need to create method to remove points for unfavoriting
        this.removePoints(recipeId);
        document.getElementById(recipeId.toString()).innerHTML
          = "<img id='i' class='favButton' src = 'outlineStar.png' />";
      }
    });
  }

  addPoints(recipeId: number) {
    this.recipeServices.getRecipeById(recipeId).subscribe((result) => {
      this.UserService.completeRecipe(result.userId);
      this.recipeServices.updateScore(recipeId);
    })
  }

  removePoints(recipeId: number) {
    this.recipeServices.removeScore(recipeId);
  }


  //Getting the group that they clicked on, works
  getGroup(id: number) {
    this.groupService.getGroupByGroupId(id).subscribe((G) => {
      this.group = G;
      console.log(this.group);
      this.getAllUsersInGroup();
    });
  }

  // we need to go through the group table and find the user with that group name and put it in a list
  getAllUsersInGroup() {
    this.groupName = this.group.groupName;
    this.groupService.getUsersInGroup(this.groupName).subscribe((result) => {
      //working
      this.groupUsers = result;
      console.log(this.groupUsers);
      for (this.i = 0; this.i <= this.groupUsers.length; this.i++) {
        this.UserService.getUserbyId(this.groupUsers[this.i].userId).subscribe((result2) => {
          this.Users.push(result2);
        })
        this.getRecipes(this.groupUsers[this.i])
      }
    })

  }

  // we are going to go through the list(which holds all the users for the group and find their recipes) 
  // and send it through this function which will get all their recipes, and then put it into a another
  // recipe list (which will be the one displayed)
  getRecipes(g: Group) {
    this.recipeServices.displayUserRecipes(g.userId).subscribe((result) => {
      this.recipes = result;
      console.log(this.recipes);
      for (this.i = 0; this.i <= this.recipes.length-1; this.i++) {
        this.allRecipes.push(this.recipes[this.i])
        console.log(this.allRecipes);
        if (this.i === this.recipes.length - 1) {
          this.sortRecipes();
        }
      }
    })
  }

  sortRecipes() {
    let list = this.allRecipes.sort((a, b) => (a.score < b.score ? 1 : -1));
    this.allRecipes = list;
  }
}


