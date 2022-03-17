import { Component } from '@angular/core';
import { GroupService } from '../../group.service';
import { Invites } from '../../invites';
import { InvitesService } from '../../invites.service';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css'],
  providers: [InvitesService, UserService, GroupService]
})
/** Invites component*/
export class InvitesComponent {
  userId: number;
  userInfo: string = "";
  inviteList: Invites[] = [];
  message: string = "";
  message2: boolean;
  message3: string = "";

  /** Invites ctor */
  constructor(private invitesService: InvitesService, private userService: UserService, private groupService: GroupService) {
    
    this.userInfo = localStorage.getItem('userEmail');

      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayInvites(this.userId);
      })
  }

  displayInvites(id: number) {
    this.invitesService.getInvites(id).subscribe((List) => {
      this.inviteList = List;
      console.log(this.inviteList);
    })
  }

  acceptInvite(name: string, id: number) {
    this.groupService.getGroupsByUser(this.userId).subscribe((result) => {
      console.log(result.length);
      if (result.length + 1 > 5) {
        this.message2 = true;
      }
      else if (result.length + 1 <= 5) {
        this.message2 = false;
      }
      console.log(this.message2);


      if (this.message2 === false) {
        this.groupService.checkGroups(this.userId, name).subscribe((result) => {
          console.log(result.length);
          if (result.length === 0) {
            this.groupService.addUsertoGroup(this.userId, name);
            this.invitesService.removeInvite(name, this.userId);
            this.message = "Accepted Invite!"
          }
          else {
            this.message = "Already In Group"
            this.invitesService.removeInvite(name, this.userId);
          }
          console.log(this.message);
        })
      }
      else if (this.message2 === true) {
        this.message3 = "Already in 5 groups"
      }
      console.log(this.message)

     



        this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
          this.userId = id.id;
          console.log(this.userId);
          this.displayInvites(this.userId);
        })

      })

  }

  declineInvite(name: string, id: number) {
    this.invitesService.removeInvite(name, this.userId);
    this.message = "Declined Invite";
 
      this.userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.userId = id.id;
        console.log(this.userId);
        this.displayInvites(this.userId);
      })
  }
}
