import { Injectable } from '@angular/core';
import { Post } from './post';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

db!: IDBDatabase;
  constructor() {
    const request = indexedDB.open('paletta');
    request.onerror = (event) => {
      console.error("pacas lett a paletta");
    };  
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };
    request.onupgradeneeded = (event: any) => {
  // Save the IDBDatabase interface
      this.db = event.target.result as IDBDatabase;

  // Create an objectStore for this database
        this.db.createObjectStore("posts");
        this.db.createObjectStore("users")
    };
  }

  savePosts(p:Post[]){
    const t = this.db.transaction("posts",'readwrite');
    t.objectStore("posts").put(p,"all_posts");
  }

  getPostsFromDB(){
    const t=this.db.transaction("posts",'readonly');
    const reqest = t.objectStore("posts").get("all_posts");
    const s = new Subject<Post[]>();
    reqest.onsuccess=(event: any)=>{s.next(event.target.result)}
    return s;
  }

  saveUsers(u:Backendless.User[]){
    const t = this.db.transaction("users",'readwrite');
    t.objectStore("users").put(u,"all_users");
  }

  getUsersFromDB(){
    const t=this.db.transaction("users",'readonly');
    const reqest = t.objectStore("users").get("all_users");
    const s = new Subject<Backendless.User[]>();
    reqest.onsuccess=(event: any)=>{s.next(event.target.result)}
    return s;
  }
}
