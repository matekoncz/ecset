import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, from, pipe, map, catchError, tap} from 'rxjs';
import { outputAst } from '@angular/compiler';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  @Output() loginEvent = new EventEmitter;

  users!: Promise<Backendless.User[]>;
  usersById!: Observable<{[key:string]:Backendless.User}>
  private LoggedIn?: boolean;
  private Currentuser?: Backendless.User;
  public load?: boolean;
  usersByIdResolver!: (value: { [key: string]: Backendless.User; } | PromiseLike<{ [key: string]: Backendless.User; }>) => void;
  constructor(public database: DatabaseService) { 
    this.load=true;
    this.users= Backendless.Data.of('Users').find();
    this.usersById=from(this.users).pipe(catchError(()=>{return this.database.getUsersFromDB()})).pipe(tap((u)=>{this.database.saveUsers(u)})).pipe(map((res)=>{
      let dict: {[key: string]:Backendless.User} ={};
      res.forEach(element => {
        dict[element.objectId!]=element;
      });
      return dict;
    }))
  }

  getUserbyId(id: string){
    return this.usersById.pipe(map((res)=>{return res[id]}))
  }

  async loadUser(){
    this.load=true;
    console.log("loading user")
    try{
      this.Currentuser = await Backendless.UserService.getCurrentUser();
      console.log("backendless answered")
      this.database.saveCurrentUser(this.Currentuser!);
    } catch{
      this.Currentuser=undefined;
    }
    if(this.Currentuser==undefined){
      console.log("from db")
      this.database.initialized.subscribe(()=>{
        this.database.getCurrentUserFromDB().subscribe((val)=>{
          if(val!=undefined){
            console.log("user found")
            this.Currentuser=val;
            this.LoggedIn = true;
          } else {
            console.log("no user found")
            this.LoggedIn=false;
          }
          console.log("finish load")
          this.load=false;
        })
      })
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
    this.database.saveCurrentUser(this.Currentuser!);
  }

  async login(username: string, password: string){
      try {
        const currentUser = await Backendless.UserService.login(username, password, true)
        this.Currentuser= currentUser;
        this.database.saveCurrentUser(this.Currentuser!);
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
    this.database.saveCurrentUser(this.Currentuser!);
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
    this.database.saveCurrentUser(this.Currentuser!);
    await Backendless.UserService.update(this.Currentuser);
  }
}