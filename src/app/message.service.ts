import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService{

  constructor() {this.loginMessage="" }
  private loginMessage : String;
  addLoginMessage(message: String){
    this.loginMessage=message;
  }
  clearLoginMessage(){
    this.loginMessage="";
  }
  getLoginMessage(){
    return this.loginMessage;
  }
}
