import { Component, OnInit } from '@angular/core';
import { TripService } from 'app/trips/trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import { Trip } from 'app/trips/trip';
import { Membership } from 'app/trips/membership';
import { Traveller } from 'app/travellers/traveller';
import { UserDataService } from 'app/app.component.service';

@Component({
  selector: 'app-trip-options',
  templateUrl: './trip-options.component.html',
  styleUrls: ['./trip-options.component.css'],
  providers: [TripService, TravellerService]
})
export class TripOptionsComponent implements OnInit {

  trip: Trip;
  user: Traveller;
  tripDesc: string;
  savesuccess = 0;
  userIsOwner = false;
  usernametoAdd: string;
  addsuccess = 0;
  deleteEnabled = false;
  deleteConfirm: string;
  constructor(private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) { }

  ngOnInit() {
    this.trip = this._userData.getTripData();
    this.user = this._userData.getUserData();
    this.tripDesc = this.trip.description;
    if (this.trip.owner === this.user.username) {
      this.userIsOwner = true;
    } else {
      this.userIsOwner = false;
    }
    this.tripService.getMembershipsByTripId(this.trip._id).then(memberships => {
      if (memberships.length > 1) {
        this.deleteEnabled = false;
      } else {
        this.deleteEnabled = true;
      }
    })

  }

  createMembership() {
    this.travellerService.getTravellerByUsername(this.usernametoAdd)
        .then((traveller: Traveller) => {
          if (traveller !== null) {
            this.tripService.getMembershipsByTravellerAndTripId(traveller._id, this.trip._id).then(memberships => {
              if (memberships.length === 0) {
                const membership: Membership = {
                  travellerId: traveller._id,
                  tripId: this.trip._id
                }
                this.tripService.createMembership(membership);
                this.addsuccess = 1;
                this.usernametoAdd = '';
              } else {
                this.addsuccess = -2;
              }
            })
          } else {
            this.addsuccess = -1;
          }
    });
    setTimeout(function() {
      this.addsuccess = 0;
      }.bind(this), 3000);
  }

  leaveTrip() {
      this.tripService.getMembershipsByTravellerAndTripId(this.user._id, this.trip._id)
      .then(memberships => {
        for (const membership of memberships) {
            this.tripService.deleteMembership(membership._id);
        }
      })
      this._userData.setTripData(null);
      this._userData.setView('start');
  }

  deleteTrip() {
    this.tripService.deleteMarkersByTripId(this.trip._id);
    this.tripService.deleteMembershipsByTripId(this.trip._id);
    this.tripService.deleteMessagesByTripId(this.trip._id);
    this.tripService.deleteTrip(this.trip._id);
    this._userData.setView('start');
    this._userData.setTripData(null);
  }

  updateDesc() {
    this.trip.description = this.tripDesc;
    this.tripService.updateTrip(this.trip);
    this.savesuccess = 1;
    setTimeout(function() {
      this.savesuccess = 0;
      }.bind(this), 3000);
  }
}
