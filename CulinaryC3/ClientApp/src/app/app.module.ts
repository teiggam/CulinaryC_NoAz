import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { GroupComponent } from './group/group.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { InvitesComponent } from './invites/invites.component';
import { FriendsComponent } from './friends/friends.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { DetailGroupComponent } from './detail-group/detail-group.component';
import { PantryComponent } from './pantry/pantry.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GroupComponent,
    DetailRecipeComponent,
    AddRecipeComponent,
    NewGroupComponent,
    InvitesComponent,
    FriendsComponent,
    AllRecipesComponent,
    LeaderboardComponent,
    FavoritesComponent,
    AddFriendComponent,
    ProfileComponent,
    UploadComponent,
    DetailGroupComponent,
    PantryComponent,
    RegisterComponent,
    LoginComponent,
    AccountSettingsComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'add-recipe', component: AddRecipeComponent },
      { path: 'detail-recipe/:id', component: DetailRecipeComponent },
      { path: 'detail-group/:id', component: DetailGroupComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'app-group', component: GroupComponent },
      { path: 'app-new-group', component: NewGroupComponent },
      { path: 'app-invites', component: InvitesComponent },
      { path: 'app-friends', component: FriendsComponent },
      { path: 'app-leaderboard', component: LeaderboardComponent },
      { path: 'app-leaderboard', component: LeaderboardComponent },
      { path: 'all-recipes', component: AllRecipesComponent },
      { path: 'app-leaderboard', component: LeaderboardComponent },
      { path: 'app-favorites', component: FavoritesComponent },
      { path: 'app-add-friend', component: AddFriendComponent },
      { path: 'app-profile', component: ProfileComponent },
      { path: 'app-upload', component: UploadComponent },
      { path: 'app-pantry', component: PantryComponent },
      { path: 'app-register', component: RegisterComponent },
      { path: 'app-login', component: LoginComponent },
      { path: 'app-account-settings', component: AccountSettingsComponent },
      {path: 'app-upload', component: UploadComponent}


    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
