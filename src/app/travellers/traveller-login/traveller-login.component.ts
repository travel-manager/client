import { Component, OnInit } from '@angular/core';
import { TravellerService } from '../traveller.service';
import { Traveller } from '../traveller';
import { Login } from '../login';

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
    password: ''
  };
  loginsuccess = 0;

  constructor(private travellerService: TravellerService) { }

  loginAttempt() {
    this.travellerService.getTraveller(this.loginTraveller.username).then((traveller: Traveller) => {
      this.dbTraveller = traveller;
       if (this.loginTraveller.password === this.dbTraveller.password) {
        this.loginsuccess = 1;
      } else {
        this.loginsuccess = -1;
      }
      setTimeout(function() {
        this.loginsuccess = 0;
      }.bind(this), 3000);
    });
  }
}
