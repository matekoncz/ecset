import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { EmojiService } from '../emoji.service';

@Component({
  selector: 'app-emoji',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent {
[x: string]: any;
  public emojis;

  constructor(public emojiservice: EmojiService){
    this.emojis=emojiservice.emojis;
  }
}
