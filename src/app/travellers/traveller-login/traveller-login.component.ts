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
  public loggedInUser: Traveller;

  constructor(private travellerService: TravellerService) { }

  loginAttempt(loginTraveller: Traveller) {
      this.travellerService.getTraveller(loginTraveller.username).then((dbtraveller: Traveller) => {
      if (loginTraveller.password === dbtraveller.password) {
        this.loginsuccess = 1;
        this.loggedInUser = dbtraveller;
        console.log('loggedin: ', this.loggedInUser);
        this.loginTraveller = {
          username: '',
          password: ''
        };
      } else {
        this.loginsuccess = -1;
        this.loginTraveller.password = '';
      }
      setTimeout(function() {
        this.loginsuccess = 0;
      }.bind(this), 3000);
    });
  }

  logOut = () => {
    this.loggedInUser = null;
  }
}
