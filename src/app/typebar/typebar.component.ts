import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-typebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typebar.component.html',
  styleUrls: ['./typebar.component.scss']
})
export class TypebarComponent {
  message="";
  emoticon = false;
  constructor( public postservice: PostService){
  }

  more(){
    this.emoticon=!this.emoticon;
  }

  sendMessage(){
   if(this.message!=""){
      console.log("eddig: ",this.message);
      this.postservice.newPost(this.message);
      this.message="";
   } 
  }
}
