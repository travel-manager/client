import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {GeoProvider } from './geoProvider';
import {UserDataService} from 'app/app.component.service';
import { Membership } from '../membership';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  providers: [TripService, GeoProvider]
})

export class TripCreateComponent implements OnInit {

  public createsuccess = 0;
  public trip: Trip = {
    location: null,
    name: null,
    picture: null,
    datestart: null,
    coords: null,
    dateend: null,
    owner: null,
    description: ''
  };

  constructor (
    private gp: GeoProvider,
    private tripService: TripService,
    private _userData: UserDataService) {}

  ngOnInit() {

  }

  updateDates = (startdate: NgbDate, enddate: NgbDate) => {
    this.trip.datestart =  new Date(startdate.year, startdate.month - 1, startdate.day);
    this.trip.dateend = new Date(enddate.year, enddate.month - 1, enddate.day);
  }

  createTrip() {

    let lat: number;
    let lng: number;
    this.gp.getCoords(this.trip.location).then(data => {
      lat = data['lat'];
      lng = data['lng'];
      if (lat != null && this.trip.datestart != null && this.trip.dateend != null) {
        this.trip.coords = [lat, lng];
        this.trip.owner = this._userData.getUserData().username;
        const membership = new Membership;

        this.tripService.createTrip(this.trip).then(createdTrip => {
          membership.travellerId = this._userData.getUserData()._id;
          membership.tripId = createdTrip._id;
          this.tripService.createMembership(membership);
        });
        this._userData.setTripData(this.trip);
        this._userData.setView('trip');
      } else {
        this.createsuccess = -1;
        this.trip.location = null;
        setTimeout(function() {
          this.createsuccess = 0;
          }.bind(this), 3000);
      }
    });
  }
}
