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

  loginuser: Login = {
    username: '',
    password: ''
  };

  loginCompare: Traveller = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };
  loginsuccess = 0;

  constructor(private travellerService: TravellerService) { }

  loginAttempt() {
    this.travellerService.getTraveller(this.loginuser.username).then((traveller: Traveller) => {
      this.loginCompare = traveller;
    });
    if (this.loginuser.password === this.loginCompare.password) {
      this.loginsuccess = 1;
    } else {
      this.loginsuccess = -1;
    }
    setTimeout(function() {
      this.loginsuccess = 0;
    }.bind(this), 3000);
  }
}
