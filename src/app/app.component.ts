import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  title = 'ecset';
  screen = "";
  constructor(public userservice: UserService, public breakpointObserver: BreakpointObserver){
    breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large]).subscribe((result)=>{
      if (result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Large]){
        this.screen="nagy";
      } else{
        this.screen="kicsi";
      }
    });
  }

   ngOnInit(): void {
    console.log("init user service")
    this.userservice.loadUser();
  }
}
