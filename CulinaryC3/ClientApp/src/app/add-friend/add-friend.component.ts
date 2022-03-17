import { Component } from '@angular/core';
import { Friends } from '../../Friends';
import { FriendsService } from '../../Friends.service';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css'],
  providers: [ FriendsService, UserService]
})
/** addFriend component*/
export class AddFriendComponent {
  userId: number;
  userInfo: string = "";
  email: User | null = null;
  uList: User[] = null;
  reveal1: string | null = null;
  reveal2: string | null = null;
  message: string;
  fList: Friends[] = null;
  newList: Friends[] = null;
  value: number;

  /** addFriend ctor */
  constructor(private userService: UserService, private friendService: FriendsService) {
    this.userInfo = localStorage.getItem('userEmail');
      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
      })
    console.log(this.message);

  }


  revealEmail() {
    this.reveal1 = "not null";
  }

  revealName() {
    this.reveal2 = "not null";
  }

  searchbyEmail(search: string) {
    this.userService.getUserbyLoginId(search).subscribe((result) => {
      this.email = result;
      console.log(this.email);
    })
  }

  searchbyName(search: string) {
    this.userService.getUsersbyName(search).subscribe((result) => {
      this.uList = result;
      console.log(this.uList);
    })
  }

  AddFriend(friendId: number) {
    this.friendService.checkFriends(this.userId, friendId).subscribe((result) => {
      this.value = null;
      this.fList = result;
      console.log(this.fList)
      if (this.fList.length > 0) {
        this.value = 1;
      }
      console.log(this.value);
      if (this.value === null && friendId != this.userId) {
        this.friendService.addFriend(this.userId, friendId);
        this.message = "Friend Added!"
      }
      else if (this.value === 1) {
        this.message = "Already Friend!"
      }
      else if (friendId == this.userId)
      {
        this.message = "Cannot Add Self"
      }
    })
  }

}
