import { Component } from '@angular/core';
import { RecipeService } from '../../RecipeService';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  providers: [RecipeService, UserService]
})
/** leaderboard component*/
export class LeaderboardComponent {

  userList: User[] = [];
  sortedList: User[] = [];
  /** leaderboard ctor */
  constructor(private userServ: UserService) {
    this.GetLeaderboard();
  }

  GetLeaderboard() {
    this.userServ.leaderboard()
      .subscribe(uList => {
        this.userList = uList;
        console.log(uList);
      });
  }
}
