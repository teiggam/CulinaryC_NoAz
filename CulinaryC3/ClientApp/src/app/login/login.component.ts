import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../UserService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
/** Login component*/
export class LoginComponent {
  bool: boolean;
  message: string = "";

  /** Login ctor */
  constructor(private userService: UserService, private router: Router) {
    console.log(localStorage.getItem('userEmail'));
  }

  signIn(form: NgForm) {
    this.userService.login(form.form.value.password, form.form.value.email).subscribe((r) => {
      this.bool = r;
      console.log(this.bool);
      if (this.bool == true) {
        localStorage.setItem('userEmail', form.form.value.email);
        this.router.navigate(['/app-profile']).then(() => {
          window.location.reload();
        });
      } else {
        this.message = "Incorrect email or password"
      }
    })
  }
}
