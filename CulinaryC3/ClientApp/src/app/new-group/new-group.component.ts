import { Component } from '@angular/core';
import { Group } from '../../group';
import { GroupService } from '../../group.service';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-new-group',
    templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
  providers: [GroupService, UserService]
})
/** NewGroup component*/
export class NewGroupComponent {
  /** NewGroup ctor */
  userInfo: string = "";
  userId: number;
  message: string;
  message2: boolean;
  gList: Group[] = [];

  constructor( private userService: UserService, private groupService: GroupService) {
   
    this.userInfo = localStorage.getItem('userEmail');

      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.numberOfGroups();
      })
  }

  CreateGroup(name: string) {

    //check for if group name already exists case sentitive(Tuna and tuna can exist)
    this.groupService.getGroups().subscribe((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].groupName == name) {
          this.gList.push(result[i]);
        }
      }
      if (this.gList.length == 0) {
        this.groupService.createNewGroup(this.userId, name);
        console.log(name);
        this.message = "Group Created!";
        


          this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
            this.userId = id.id;
            console.log(this.userId);
            this.numberOfGroups();
          })
      } else {
        this.message = "Group name already exists try again";
      }
    })



    
  }

  numberOfGroups() {
    this.groupService.getGroupsByUser(this.userId).subscribe((result) => {
      console.log(result.length);
      if (result.length + 1 > 5) {
        this.message2 = true;
      }
      else if (result.length + 1 <= 5)
      {
        this.message2 = false;
      }
    })
  }
}
