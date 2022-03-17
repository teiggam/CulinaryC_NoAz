import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false ;
  isCollapsed = true;
  userloginId: string = "";

  constructor(private router: Router) {
    this.userloginId = localStorage.getItem('userEmail');
    console.log(this.userloginId);
    
  }

  ngOnInit() {
    if (localStorage.getItem('userEmail') === null || localStorage.getItem('userEmail') === 'null') {
      document.getElementById('navlink1').innerHTML = "";
      document.getElementById('navlink2').innerHTML = "";
      document.getElementById('navlink3').innerHTML = "";
      document.getElementById('navlink4').innerHTML = "";
      document.getElementById('navlink5').innerHTML = "";

    }
    else
    {
      document.getElementById('begone1').innerHTML = "";
      document.getElementById('begone2').innerHTML = "";
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


  logout() {

    localStorage.setItem('userEmail', null);
    //document.getElementById('navlink').innerHTML = "";
    //document.getElementById('navlink').innerHTML = "";
    //document.getElementById('navlink').innerHTML = "";
    //document.getElementById('navlink').innerHTML = "";
    //document.getElementById('navlink').innerHTML = "";

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
