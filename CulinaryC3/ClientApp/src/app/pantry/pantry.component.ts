import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Avatars } from '../../Avatars';
import { Titles } from '../../Titles';
import { User } from '../../User';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css'],
  providers: [UserService]
})
/** pantry component*/
export class PantryComponent {
  userInfo: string = "";
  userId: number;
  user: User | undefined = undefined;
  titles: Titles[] = [{ title: "Kitchen Porter", value: 251 },
  { title: "Junior Cook", value: 501 },
  { title: "Station Chef", value: 751 },
  { title: "Sous Chef", value: 1001 },
  { title: "Head Chef", value: 2001 },
  { title: "Executive Chef", value: 5001 },
  { title: "Master Chef", value: 10001 },
  { title: "Culinary God", value: 17501 }];

  avatar: Avatars = { image: "Default_Hat.png", value: 0 };
  avatars1: Avatars[] = [{ image: "Chicken.png", value: 100 }, { image: "Elephant.png", value: 100 }];
  avatars2: Avatars[] = [{ image: "Horse.png", value: 251 }, { image: "Llama.png", value: 251 }];
  avatars3: Avatars[] = [{ image: "Mouse.png", value: 501 }, { image: "Shrimp.png", value: 501 }];
  avatars4: Avatars[] = [{ image: "Snake.png", value: 1001 }, { image: "Squirrel.png", value: 1001 }];
  


  /** pantry ctor */
  constructor(private userService: UserService) {
    this.userInfo = localStorage.getItem('userEmail');
    console.log(this.userInfo);
    console.log(this.titles);
    if (this.userInfo !== null) {


      userService.getUserbyLoginId(this.userInfo).subscribe((id) => {
        this.user = id;
        this.userId = id.id;
        console.log(this.userId);

      })
    }
  }

  changeName(name: NgForm) {
    this.userService.updateUsers(name.form.value.value, this.userId);
    window.location.reload();
  }

  changeTitle(title: string) {
    this.userService.title(title, this.userId);
  }

  changeAvatar(img: string) {
    this.userService.avatar(img, this.userId);
  }
}
