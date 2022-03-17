import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
/** Register component*/
export class RegisterComponent {
  users: User[] = []
  message: string = "";
  /** Register ctor */
  constructor(private userService: UserService, private router: Router) {

  }

  createUser(form: NgForm) {
    this.userService.leaderboard().subscribe((result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].loginId === form.form.value.email) {
          this.users.push(result[i])
        }
      }
      if (this.users.length == 0) {
        this.userService.createUser(form.form.value.email, form.form.value.password);
        this.message = "Registration success";
        this.router.navigate(['/app-login']);
      }
      else
      {
        this.message = "Email already registered";
      }
    })
    // this is for login not register. localStorage.setItem('userEmail', form.form.value.email);
  }
}
