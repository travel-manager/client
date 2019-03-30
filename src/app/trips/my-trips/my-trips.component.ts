import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { Membership } from '../membership';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
  providers: [TripService]
})
export class MyTripsComponent implements OnInit {

  loadingStatus = false;
  trips: Trip[] = [];
  user: Traveller;
  memberships: Membership[] = [];
  selectedTrip: Trip;
  public tripPictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';

  constructor(private tripService: TripService, private _userData: UserDataService) { }

  ngOnInit() {
    this.user = this._userData.getUserData();
    this.loadingStatus = true;
    this.updateMemberships();
    // interval(5000).subscribe(() => this.updateMemberships());
  }
  updateMemberships() {
    this.tripService
      .getMembershipsByTravellerId(this.user._id)
      .then((memberships: Membership[]) => {
        if (memberships.length === 0) {
          this.loadingStatus = false;
        }
        this.memberships = memberships;
        this.updateMyTrips();
        /*if (this.memberships.length !== this.trips.length) {
          this.updateMyTrips();
        }*/
      });
  }
  updateMyTrips() {
    this.trips = [];
    for (const membership of this.memberships) {
      this.tripService
      .getTripById(membership.tripId)
      .then((trip: Trip) => {
        if (this.trips.push(trip) >= this.memberships.length) {
          this.loadingStatus = false;
        };
      });
    }
  }
  selectTrip(trip: Trip) {
    this._userData.setTripData(trip);
    this._userData.setView('trip');
  }
}
