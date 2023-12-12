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
  public load?: boolean;
  constructor() {
    this.load=true;
  }

  async loadUser(){
    this.load=true;
    console.log("loading user")
    try{
      this.Currentuser = await Backendless.UserService.getCurrentUser();
    } catch{
      this.Currentuser=undefined;
    }
    if(this.Currentuser==undefined){
      console.log("no user")
      this.LoggedIn=false;
    } else {
      this.LoggedIn = true;
      console.log("user: "+this.Currentuser.username)
    }
    this.load=false;
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
    return (this.Currentuser! as any).name;
  }

  async setUserName(name :string){
    (this.Currentuser! as any).name = name;
    await Backendless.UserService.update(this.Currentuser);
  }

  logout(){
    this.LoggedIn=false;
    this.Currentuser=undefined;
    Backendless.UserService.logout();
  }

  getProfilePic(){
    return (this.Currentuser! as any).avatar;
}

  async setProfilePic(url: String){
    (this.Currentuser! as any).avatar=url;
    await Backendless.UserService.update(this.Currentuser);
  }
}