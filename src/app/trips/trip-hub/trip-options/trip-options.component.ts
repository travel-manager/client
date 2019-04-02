import { Component, OnInit } from '@angular/core';
import { TripService } from 'app/trips/trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import { Trip } from 'app/trips/trip';
import { Membership } from 'app/trips/membership';
import { Traveller } from 'app/travellers/traveller';
import { UserDataService } from 'app/app.component.service';
import { Notification } from '../trip-feed/notification';
import { DatePipe } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-trip-options',
  templateUrl: './trip-options.component.html',
  styleUrls: ['./trip-options.component.css'],
  providers: [TripService, TravellerService, DatePipe]
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
  toggleState;

  constructor(
    private tripService: TripService,
    private travellerService: TravellerService,
    public _userData: UserDataService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.trip = this._userData.getTripData();
    this.user = this._userData.getUserData();
    if (this.trip.public === true) {
      this.toggleState = 'Public';
    } else {
      this.toggleState = 'Private';
    }
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
                const notification: Notification = {
                  content: traveller.username + ' was invited to trip',
                  tripId: this.trip._id,
                  type: 'invite',
                  timestamp: null,
                  icon: 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/icon-joined'
                }
                this.tripService.createNotification(notification);
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
      const notification: Notification = {
        content: this.user.username + ' left trip',
        tripId: this.trip._id,
        type: 'left',
        timestamp: null,
        icon: 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/icon-left'
      }
      this.tripService.createNotification(notification);
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
    this.tripService.getTripById(this.trip._id).then(trip => {
      this.trip = trip;
      this.trip.description = this.tripDesc;
    this.tripService.updateTrip(this.trip);
    this._userData.setTripData(this.trip);
    this.savesuccess = 1;
    setTimeout(function() {
      this.savesuccess = 0;
      }.bind(this), 3000);
    })
  }

  updatePublic(toggle: MatSlideToggleChange) {
    this.tripService.getTripById(this.trip._id).then(trip => {
      this.trip = trip;
      this.trip.public = toggle.checked;
      if (this.trip.public === true) {
        this.toggleState = 'Public';
      } else {
        this.toggleState = 'Private';
      }
      this._userData.setTripData(this.trip);
      this.tripService.updateTrip(this.trip);
    })
  }
}
