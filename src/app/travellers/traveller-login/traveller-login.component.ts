import { Component, OnInit } from '@angular/core';
import { TravellerService } from '../traveller.service';
import { Traveller } from '../../models/traveller';
import { Login } from '../../models/login';
import {UserDataService} from 'app/app.component.service';

@Component({
  selector: 'app-traveller-login',
  templateUrl: './traveller-login.component.html',
  styleUrls: ['./traveller-login.component.css'],
  providers: [TravellerService]
})
export class TravellerLoginComponent {

  loginTraveller: Login = {
    username: '',
    password: '',
    role: 2
  };

  dbTraveller: Traveller = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    picture: null,
    bio: '',
    country: ''
  };
  loginsuccess = 0;
  constructor(
    private travellerService: TravellerService,
    public _userData: UserDataService) { }

  loginAttempt(loginTraveller: Login) {
      this.travellerService.loginTraveller(loginTraveller).then((dbtraveller: Traveller) => {
        alert(dbtraveller);
      });
  }
}
