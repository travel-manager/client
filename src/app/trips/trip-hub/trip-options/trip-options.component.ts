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
  constructor(private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) { }

  ngOnInit() {
  }

  createMembership() {
    this.travellerService.getTravellerByUsername(this.usernametoAdd)
        .then((traveller: Traveller) => {
          if (traveller !== null)
          {
            const membership: Membership = {
              travellerId: traveller._id,
              tripId: this._userData.getTripData()._id
            }
            this.tripService.createMembership(membership);
            this.addsuccess = 1;
          } else {
            this.usernametoAdd = '';
            this.addsuccess = -1;
          }
    });
    setTimeout(function() {
      this.addsuccess = 0;
      }.bind(this), 3000);
  }

}
