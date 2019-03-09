import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
  providers: [TripService]
})
export class MyTripsComponent implements OnInit {

  trips: Trip[] = [];
  selectedTrip: Trip
  constructor(private tripService: TripService, private _userData: UserDataService) { }

  ngOnInit() {
    let owner: Traveller = this._userData.getUserData();
    this.tripService
      .getTrips()
      .then((trips: Trip[]) => {
        this.trips = trips;
      });

    /* this.tripService
      .getTripsByOwner(owner)
      .then((trips: Trip[]) => {
        this.trips = trips;
        console.log('trips:', trips);
      }); */
  }

  selectTrip(trip: Trip) {
    this._userData.setTripData(trip);
    this._userData.setView('trip');
  }
}
