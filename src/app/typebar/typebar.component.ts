import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { NgIf } from '@angular/common';
import { EmojiComponent } from '../emoji/emoji.component';
import { EmojiService } from '../emoji.service';

@Component({
  selector: 'app-typebar',
  standalone: true,
  imports: [CommonModule, FormsModule,NgIf,EmojiComponent],
  templateUrl: './typebar.component.html',
  styleUrls: ['./typebar.component.scss']
})
export class TypebarComponent {
  message="";
  emoticon = false;
  constructor( public postservice: PostService, public emojiservice: EmojiService){
    this.emojiservice.emojiSubject.subscribe((emoji)=>this.message=this.message+"#"+emoji+"#")
  }

  more(){
    this.emoticon=!this.emoticon;
    setTimeout(()=>{window.scrollTo(0,document.body.scrollHeight)},20);
  }

  sendMessage(){
   if(this.message!=""){
      console.log("eddig: ",this.message);
      this.postservice.newPost(this.message);
      this.message="";
   } 
  }
}
