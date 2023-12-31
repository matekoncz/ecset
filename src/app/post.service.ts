import { Injectable } from '@angular/core';
import { Post } from './post';
import { catchError, from, ReplaySubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public forceLoad;
  constructor(public database: DatabaseService) {
    this.forceLoad = new ReplaySubject<Post[]>();
    console.log("init p-service")
    this.loadPosts(0).pipe(catchError(()=>this.database.getPostsFromDB())).subscribe((p)=>this.forceLoad.next(p));
  }

  loadPosts(n: number){
    var queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(10).setSortBy(['created DESC']);
    queryBuilder.setOffset(n);
    console.log("loading posts");
    return from(Backendless.Data.of('POSTS').find<Post>(queryBuilder));
  }

  async newPost(message: String){
    await Backendless.Data.of('POSTS').save({
      content: message
    })
    console.log("msg done: ", message);
    this.loadPosts(0).subscribe((p)=>this.forceLoad.next(p));
  }

}
