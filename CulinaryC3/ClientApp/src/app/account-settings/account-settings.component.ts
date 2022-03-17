import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../User';

import { UserService } from '../../UserService';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [UserService]
})
/** AccountSettings component*/
export class AccountSettingsComponent {
  userInfo: string = "";
  user: User;
  userId: number;
  bool: boolean;
  passMessage: string;
  emailMessage: string;
  remove: boolean = false;
  deleteMessage: string;
  WinnerMessage: string;
  num: number;

  /** AccountSettings ctor */
  constructor(private userService: UserService, private router: Router) {
    this.userInfo = localStorage.getItem("userEmail");
    userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
      this.user = id;
      this.userId = id.id;
      console.log(this.userId);
    })
  }

  changePassword(form: NgForm) {
    if (form.form.value.p1 === form.form.value.p2) {
      this.userService.login(form.form.value.p1, this.userInfo).subscribe((r) => {
        this.bool = r;
        console.log(this.bool);
        if (this.bool == true) {
          this.userService.newPass(form.form.value.newPas, this.userId);
          this.passMessage = "Password updated";
        } else {
          this.passMessage = "Incorrect current password";
        }
      })
    }
    else
    {
      this.passMessage = "Passwords do not match";
    }
  }

  changeEmail(form: NgForm) {
    this.userService.newEmail(form.form.value.email, this.userId);
    this.emailMessage = "Email Updated";
    localStorage.setItem('userEmail', form.form.value.email);
    this.userInfo = localStorage.getItem('userEmail');
  }

  delete() {
    if (this.remove === false) {
      document.getElementById('permanent').innerHTML = "Last Chance.."
      this.remove = true;
    }
    else if (this.remove === true) {
      this.userService.deleteUser(this.userId);
      this.deleteMessage = "Account deleted Goodbye";
      localStorage.setItem('userEmail', null);
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
  }

  //guess a number between 1 and 1,000,000
  Guess(form: NgForm) {
    this.num = Math.floor((Math.random() * 1000000) + 1);
    console.log(this.num);
    if (form.form.value.guesses == this.num) {
      this.userService.Winner(this.userId);
      this.WinnerMessage = "WINNER!!"
    }
    else
    {
      this.WinnerMessage = "A developer knows the secret"
    }
  }
}
