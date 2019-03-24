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

  usernametoAdd: string;
  addsuccess = 0;
  tripId: string;
  constructor(private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) { }

  ngOnInit() {
    this.tripId = this._userData.getTripData()._id;
  }

  createMembership() {
    this.travellerService.getTravellerByUsername(this.usernametoAdd)
        .then((traveller: Traveller) => {
          if (traveller !== null) {
            this.tripService.getMembershipsByTravellerAndTripId(traveller._id, this.tripId).then(memberships => {
              console.log(memberships);
              if (memberships.length === 0) {
                const membership: Membership = {
                  travellerId: traveller._id,
                  tripId: this.tripId
                }
                this.tripService.createMembership(membership);
                this.addsuccess = 1;
              } else {
                this.usernametoAdd = '';
                this.addsuccess = -2;
              }
            })
          } else {
            this.usernametoAdd = '';
            this.addsuccess = -1;
          }
    });
    setTimeout(function() {
      this.addsuccess = 0;
      }.bind(this), 3000);
  }

  leaveTrip() {
      this.tripService.getMembershipsByTravellerAndTripId(this._userData.getUserData()._id, this.tripId).then(memberships => {
        for (const membership of memberships) {
            this.tripService.deleteMembership(membership._id);
        }
      })
      this._userData.setTripData(null);
      this._userData.setView('start');
  }

}
