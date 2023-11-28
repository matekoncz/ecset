import { Component } from '@angular/core';
import { TypebarComponent } from '../typebar/typebar.component';

@Component({
  standalone: true,
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.scss'],
  imports: [TypebarComponent]
})
export class MessageBoardComponent {

}
