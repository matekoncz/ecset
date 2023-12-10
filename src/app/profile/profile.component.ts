import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FormsModule, NgIf]
})
export class ProfileComponent {
  public check = "\u2714";
  name: string;
  edit=false;
  constructor(public userservice: UserService){
    this.name=this.userservice.getUserName();
  }

  editProfile(){
    if(!this.edit){
      this.edit=true;
    }
  }

  changeName(){
    if(this.name!=this.userservice.getUserName()){
      this.userservice.setUserName(this.name);
    }
    this.edit=false
  }
}
