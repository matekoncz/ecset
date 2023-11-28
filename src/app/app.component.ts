import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'ecset';
  constructor(public userservice: UserService){
  }

   ngOnInit(): void {
    console.log("init user service")
    this.userservice.loadUser();
  }
}
