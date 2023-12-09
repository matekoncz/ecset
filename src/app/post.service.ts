import { Injectable } from '@angular/core';
import { Post } from './post';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {}

  loadPosts(n: number){
    var queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(10).setSortBy(['created DESC']);
    queryBuilder.setOffset(n);

    return from(Backendless.Data.of('POSTS').find<Post>(queryBuilder));
  }
}
