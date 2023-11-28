import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(public userservice: UserService){}
}
