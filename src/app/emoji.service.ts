import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  public emojis=["cat","dog","woody","pepe","orca","raccoon"]
  public emojiSubject: Subject<string>;
  constructor() {
    this.emojiSubject = new Subject<string>();
  }


  
  getUrl(emoji: string){
    return "assets/emojis/"+emoji+".png"
  }

  sendEmoji(emoji: string){
    this.emojiSubject.next(emoji);
  }
}
