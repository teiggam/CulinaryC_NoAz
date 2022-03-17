import { Component } from '@angular/core';
import { Friends } from '../../Friends';
import { FriendsService } from '../../Friends.service';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [ FriendsService, UserService]
})
/** friends component*/
export class FriendsComponent {
  userInfo: string = "";
  userId: number;
  fList: Friends[] = [];
  uList: User[] = [];
  message: string = "";

  /** friends ctor */
  constructor(private userService: UserService, private friendService: FriendsService) {
    
    this.userInfo = localStorage.getItem('userEmail');

      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayFriends(this.userId);
      })
  }

  displayFriends(id: number) {
    this.friendService.getFriends(this.userId).subscribe((result) => {
      this.fList = result;
      console.log(this.fList);
    })
  }

  removeFriend(friendId: number) {
    this.friendService.removeFriend(this.userId, friendId);
    this.message = "Friend Removed"

    this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.userId = id.id;
      console.log(this.userId);
      this.displayFriends(this.userId);
    })
    window.location.reload();
  }
}
