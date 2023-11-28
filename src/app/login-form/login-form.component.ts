import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';
@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    FormsModule,NgIf
  ]
})
export class LoginFormComponent {
  constructor(public messages: MessageService, public userservice: UserService){}
  username?: string;
  password?: string;
  login(){
    this.messages.clearLoginMessage();
    if(this.password!=null && this.username!=null){
      this.userservice.login(this.username,this.password);
    } else {
      this.messages.addLoginMessage("HIBA: Hiányos adatok; töltse ki mindkét mezőt");
    }
  }
}
