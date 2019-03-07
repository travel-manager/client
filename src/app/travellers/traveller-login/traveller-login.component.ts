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
      console.log('login: ', loginTraveller, ' db: ', dbtraveller)
      if (dbtraveller == null) {
        this.loginsuccess = -1;
        this.loginTraveller.password = '';
      } else if (loginTraveller.password === dbtraveller.password) {
        this.loginsuccess = 1;
        this.loggedInUser = dbtraveller;
        this.loginTraveller = {
          username: '',
          password: ''
        };
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
