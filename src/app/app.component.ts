import { Component, OnInit } from '@angular/core';
import { UserDataService } from './app.component.service';
import { Traveller } from 'app/travellers/traveller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public view: string;
  constructor(public _userData: UserDataService) {
    }

  ngOnInit() {
  }

  logOut()
  {
    this._userData.setUserData(null);
    this._userData.setView('start');
  }

  setView(view: string) {
    if (this._userData.getView() !== view) {
      this._userData.setView(view);
    } else {
      this._userData.setView('start');
    }
  }
}
