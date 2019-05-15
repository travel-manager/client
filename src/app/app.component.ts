import { Component, OnInit } from '@angular/core';
import { UserDataService } from './app.component.service';
import { Traveller } from 'app/models/traveller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public view: string;
  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  constructor(public _userData: UserDataService) {
    }

  ngOnInit() {
  }

  setView(view: string) {
    if (this._userData.getView() !== view) {
      this._userData.setView(view);
    } else {
      this._userData.setView('start');
    }
  }
}
