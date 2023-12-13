import { Component } from '@angular/core';
import { TypebarComponent } from '../typebar/typebar.component';
import { PostService } from '../post.service';
import { Post } from '../post';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  standalone: true,
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.scss'],
  imports: [TypebarComponent, PostComponent, NgFor]
})
export class MessageBoardComponent {
  private current = 0;
  public posts: Post[]=[];
  constructor(public postservice: PostService,public database: DatabaseService){
    this.postservice.forceLoad.subscribe((newposts)=>{this.posts=newposts; console.log(" load to msg-board");this.database.savePosts(this.posts)});
  }
}
