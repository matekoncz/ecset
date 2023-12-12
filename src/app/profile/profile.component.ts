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
  loaded=false;
  upload=false;
  profile_pic?: String;

  constructor(public userservice: UserService){
    this.name=this.userservice.getUserName();
    this.profile_pic=this.userservice.getProfilePic();
  }

  editProfile(){
    if(!this.edit){
      this.edit=true;
    }
  }

  changeImage(){
    if(!this.upload){
      this.upload=true;
    }
  }
  cancel(){
    this.upload=false;
    this.profile_pic=this.userservice.getProfilePic();
    this.loaded=false;
  }

  changeName(){
    if(this.name!=this.userservice.getUserName()){
      this.userservice.setUserName(this.name);
    }
    this.edit=false
  }

  upLoadImage(){
    this.upload=false;
    this.loaded=false;
    this.userservice.setProfilePic(this.profile_pic!);
  }

  loadFile(event:any){
    console.log("elek")
    this.getBase64(event.target.files[0],(res: any)=>{
      if(res.length<21000){
        this.profile_pic=res;
      } else {
        alert("A feltöltött kép túl nagy");
        this.cancel();
      }
    })
    this.loaded=true;
  }

    getBase64(file: File, callback: Function) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        callback(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }
}
