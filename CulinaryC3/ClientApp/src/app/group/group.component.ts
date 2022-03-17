import { Component } from '@angular/core';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';
import { FriendsService } from '../../Friends.service';
import { Friends } from '../../Friends';
import { User } from '../../User';
import { InvitesService } from '../../invites.service';
 
@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupService, UserService, FriendsService, InvitesService]
})
/** group component*/
export class GroupComponent {
  userInfo: string = "";
  userId: number;
  groupList: Group[] = [];
  fList: Friends[] = [];
  userList: User[] = [];
  message: string | null = null;
  gList: User[] = [];
  message2: string | null = null;
  groups: Group[] = [];

  //------------ ADD USER service to group ---------------
  constructor(private groupService: GroupService, private userService: UserService,
    private friendsService: FriendsService, private invitesService: InvitesService) {

    this.groups = null;
    this.groups = [];
    //this.displayGroups();

    //will get the userName / Email from the login of identity
    
    this.userInfo = localStorage.getItem('userEmail');

      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayGroups(this.userId);
      })

    //call method to display group related to user by User Id
  }

  displayGroups(id: number): any {
    this.groupService.getGroupsByUser(id).subscribe((result) => {
      this.groupList = result;
      console.log(this.groupList);
    });
    
  }

  friendsList(){
    this.friendsService.getFriends(this.userId).subscribe((result) => {
      this.fList = result;
      console.log(result)
      console.log(this.fList);

      for (let i = 0; i < this.fList.length; i++) {
        this.userService.getUserbyId(this.fList[i].id)
          .subscribe((list) => {
            this.userList.push(list);
          })
      }
    })
  }

  groupUsers(name: string) {
    this.gList = [];
    this.groupService.getGroupbyName(name).subscribe((result) => {

      for (let i = 0; i < result.length; i++) {
        this.userService.getUserbyId(result[i].userId)
          .subscribe((list) => {
            if (list.id !== this.userId) {
              this.gList.push(list);
            }
          })
      }
    })
  }

  inviteFriend(friendId: number, groupName: string) {
    this.groupService.getGroups().subscribe((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].groupName === groupName && result[i].userId === friendId) {
          this.groups.push(result[i]);
        }
      }
      console.log(this.groups)
      if (this.groups.length == 0) {
        this.invitesService.sendInvite(friendId, this.userInfo, groupName);
        this.message = "Friend Invited!";
        return this.message;
      }
      else
      {
        this.message = "Friend already group member!";
        return this.message;
      }
    })
    
  }

  removeUser(id: number, groupName: string) {
    console.log(id);
    console.log(groupName);
    
    this.groupService.removeUser(groupName, id);
    this.message = "User Removed";
    this.groupUsers(groupName);
  }

  removeSelf(name: string) {
    console.log(name);
    this.groupService.getGroupbyName(name).subscribe((result) => {
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        if (result[i].userId === this.userId) {
          let g: Group = result[i];
          if (g.admin === false) {
            this.groupService.removeUser(g.groupName, g.userId);
          }
          else {
            this.groupService.removeGroup(name);
          }
        }
      }
      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayGroups(this.userId);
      })
      window.location.reload();
    })
  }

  hide() {
      let div = document.getElementById("button");
      div.style.display = 'none';
  }

  deleteGroup(name: string) {
    console.log(name);
    this.groupService.removeGroup(name);
    this.message = "Group Removed!"

    window.location.reload();

  }
}
