import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Post } from '../post';
import { UserService } from '../user.service';
import{Observable, tap} from 'rxjs';
import { NgIf } from '@angular/common';
@Component({
  selector: 'post-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  @Input() post!: Post;
  user?: Observable<Backendless.User>;
  picurl: String="";
  name: String="";
  email= "";
  me: Boolean=false;


  constructor(public userservice: UserService){
  }

  ngOnInit(): void {
    this.user=this.userservice.getUserbyId(((this.post as any).ownerId) as string);
    this.user.pipe(tap(console.log)).subscribe({next: (x: any)=>{this.name=x.name; this.email=x.email; this.picurl=x.avatar; if(this.email==this.userservice.getUser()?.email){this.me=true;}}})
  }
}
