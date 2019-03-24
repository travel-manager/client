import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'app/app.component.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {

  constructor(private _userData: UserDataService) { }

  ngOnInit() {
  }

  logOut()
  {
    this._userData.setUserData(null);
    this._userData.setView('start');
  }
}
