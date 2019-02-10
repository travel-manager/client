import { Component, Input } from '@angular/core';
import { Traveller } from '../traveller';

@Component({
  selector: 'app-traveller-logout',
  templateUrl: './traveller-logout.component.html',
  styleUrls: ['./traveller-logout.component.css']
})
export class TravellerLogoutComponent {
  @Input()
  loggedInUser: Traveller;
  @Input()
  logoutHandler: Function;

  constructor() { }

  logOut() {
    this.loggedInUser = null;
    this.logoutHandler();
  }
}
