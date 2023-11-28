import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { registered_users } from './mock-users';
import { Observable } from 'rxjs';
import { outputAst } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  @Output() loginEvent = new EventEmitter;

  private LoggedIn?: boolean;
  private Currentuser?: Backendless.User;
  constructor() {}

  // alábbi kód idővel törlendő


  //innen ok

  async loadUser(){
    console.log("loading user")
    this.Currentuser = await Backendless.UserService.getCurrentUser();
    if(this.Currentuser==undefined){
      console.log("no user")
      this.LoggedIn=false;
    } else {
      this.LoggedIn = true;
      console.log("user: "+this.Currentuser.username)
    }
  }

  setCurrentUser(user: Backendless.User){
    this.Currentuser=user;
  }

  async login(username: string, password: string){
      try {
        const currentUser = await Backendless.UserService.login(username, password, true)
        this.Currentuser= currentUser;
        console.log(currentUser, this.Currentuser);
        this.LoggedIn=true;
        //this.loginEvent.emit(currentUser)
      } catch (error) {
        window.alert("A MANÓBA! Nem sikerült bejelentkezni.")
        console.log(error)
      }
  }

  isLoggedIn(){
    return this.LoggedIn;
  }

  getUser(){
    return this.Currentuser;
  }

  getUserName(){
    return this.Currentuser!.username;
  }

  logout(){
    this.LoggedIn=false;
    this.Currentuser=undefined;
    Backendless.UserService.logout();
  }
}