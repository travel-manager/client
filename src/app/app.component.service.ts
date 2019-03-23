import { Injectable } from '@angular/core';
import { Traveller } from './travellers/traveller';
import { Trip } from './trips/trip';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user: Traveller = null;
  trip: Trip = null;
  view = 'start';

  constructor (private http: HttpClient) {}

  getUserData() {
    return this.user;
  }
  setUserData(data: Traveller) {
    this.user = data;
  }
  getTripData() {
    return this.trip;
  }
  setTripData(data: Trip) {
    this.trip = data;
  }

  getView() {
    return this.view;
  }
  setView(data: string) {
    this.view = data;
  }
}
