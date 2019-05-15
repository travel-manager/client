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
    password: ''
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

  loginAttempt(loginTraveller: Traveller) {
      this.travellerService.getTravellerByUsername(loginTraveller.username).then((dbtraveller: Traveller) => {
        const bcrypt = require('bcryptjs');
        if (dbtraveller == null) {
          this.loginsuccess = -1;
          this.loginTraveller.password = '';
        } else {
          bcrypt.compare(loginTraveller.password, dbtraveller.password).then(res => {
            if (res === true) {
              this.loginsuccess = 1;
              this._userData.setUserData(dbtraveller);
              this.loginTraveller = {
              username: '',
              password: ''
              };
              this._userData.setView('start');
            } else {
              this.loginsuccess = -1;
              this.loginTraveller.password = '';
              }
              setTimeout(function() {
                this.loginsuccess = 0;
                }.bind(this), 3000);
          });
        }
      });
  }
}
