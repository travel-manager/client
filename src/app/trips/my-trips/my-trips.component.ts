import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { Membership } from '../membership';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
  providers: [TripService]
})
export class MyTripsComponent implements OnInit {

  trips: Trip[] = [];
  memberships: Membership[] = [];
  selectedTrip: Trip
  constructor(private tripService: TripService, private _userData: UserDataService) { }

  ngOnInit() {
    this.updateMemberships();
    interval(1000).subscribe(() => this.updateMemberships());
  }
  updateMemberships() {
    this.tripService
      .getMembershipsByTravellerId(this._userData.getUserData()._id)
      .then((memberships: Membership[]) => {
        console.log(this.memberships.length, memberships.length);
        this.memberships = memberships;
        if (this.memberships.length !== this.trips.length) {
          this.updateMyTrips();
        }
      });
  }
  updateMyTrips() {
    this.trips = [];
    for (const membership of this.memberships) {
      console.log(membership.tripId);
      this.tripService
      .getTripById(membership.tripId)
      .then((trip: Trip) => {
        this.trips.push(trip);
      });
    }
  }
  selectTrip(trip: Trip) {
    this._userData.setTripData(trip);
    this._userData.setView('trip');
  }
}
