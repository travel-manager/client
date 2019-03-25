import { Component, OnInit } from '@angular/core';
import { TripService } from 'app/trips/trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import { Trip } from 'app/trips/trip';
import { Membership } from 'app/trips/membership';
import { Traveller } from 'app/travellers/traveller';
import { UserDataService } from 'app/app.component.service';
import { Notification } from '../trip-feed/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-options',
  templateUrl: './trip-options.component.html',
  styleUrls: ['./trip-options.component.css'],
  providers: [TripService, TravellerService, DatePipe]
})
export class TripOptionsComponent implements OnInit {
  private tripId;
  usernametoAdd: string;
  addsuccess = 0;
  constructor(private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.tripId = this._userData.getTripData()._id;
  }

  createMembership() {
    this.travellerService.getTravellerByUsername(this.usernametoAdd)
        .then((traveller: Traveller) => {
          if (traveller !== null) {
            this.tripService.getMembershipsByTravellerAndTripId(traveller._id, this.tripId).then(memberships => {
              if (memberships.length === 0) {
                const membership: Membership = {
                  travellerId: traveller._id,
                  tripId: this._userData.getTripData()._id
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
    const user = this._userData.getUserData();
      this.tripService.getMembershipsByTravellerAndTripId(user._id, this._userData.getTripData()._id)
      .then(memberships => {
        for (const membership of memberships) {
            this.tripService.deleteMembership(membership._id);
        }
      })
      const notification: Notification = {
        content: user.username + ' left trip',
        tripId: this.tripId,
        type: 'left',
        timestamp: this.datepipe.transform(new Date(), 'HH:mm:ss: dd.MM.yy').toString()
      }
      this.tripService.createNotification(notification);
      this._userData.setTripData(null);
      this._userData.setView('start');
  }

}
