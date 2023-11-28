import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-typebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typebar.component.html',
  styleUrls: ['./typebar.component.scss']
})
export class TypebarComponent {
  message?: string;
  emoticon = false;
  constructor(){
  }

  more(){
    this.emoticon=!this.emoticon;
  }
}
