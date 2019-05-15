import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'app/app.component.service';
import { Countries } from '../../models/countries';
import { TravellerService } from '../traveller.service'
import { Traveller } from '../../models/traveller';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css'],
  providers: [TravellerService]
})
export class ProfileOptionsComponent implements OnInit {

  objectKeys = Object.keys;
  user: Traveller;
  selectedCountry: string;
  userBio: string;
  savesuccess = 0;
  public countries: Countries = new Countries;
  constructor(private travellerService: TravellerService, private _userData: UserDataService) { }

  ngOnInit() {
    this.user = this._userData.getUserData();
    this.selectedCountry = this.countries.isoCountries[this.user.country.toUpperCase()];
    this.userBio = this.user.bio;
  }

  updateCountry() {
    this.user = this._userData.getUserData();
    this.user.country =
     Object.keys(this.countries.isoCountries).find(key => this.countries.isoCountries[key] === this.selectedCountry).toLowerCase();
    this.travellerService.updateTraveller(this.user);
  }

  updateBio() {
    this.user = this._userData.getUserData();
    this.user.bio = this.userBio;
    this.travellerService.updateTraveller(this.user);
    this.savesuccess = 1;
    setTimeout(function() {
      this.savesuccess = 0;
      }.bind(this), 3000);
  }

  logOut() {
    this._userData.setUserData(null);
    this._userData.setView('start');
  }
}
