import { Component, Input } from '@angular/core';
import { Traveller } from '../traveller';
import { UserDataService } from 'app/app.component.service';

@Component({
  selector: 'app-traveller-logout',
  templateUrl: './traveller-logout.component.html',
  styleUrls: ['./traveller-logout.component.css']
})
export class TravellerLogoutComponent {

  constructor(
    public _userData: UserDataService) { }


  logOut() {
    this._userData.setUserData(null);
  }
}
