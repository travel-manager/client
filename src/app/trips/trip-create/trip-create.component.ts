import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { DatepickerComponent } from './datepicker.component'
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  providers: [TripService]
})

export class TripCreateComponent implements OnInit {

  public createsuccess = 0;
  trip: Trip = {
    location: null,
    name: null,
    datestart: null,
    dateend: null,
    members: null,
    owner: null,
    description: null
  };

  constructor (
    private tripService: TripService) {}

  ngOnInit() {
  }

  updateDates = (startdate: NgbDate, enddate: NgbDate) => {
    this.trip.datestart = new Date(startdate.year, startdate.month - 1, startdate.day);
    this.trip.dateend = new Date(enddate.year, enddate.month - 1, enddate.day);
    console.log(this.trip);
  }

  createTrip(trip: Trip) {
    this.tripService.createTrip(trip);
    this.createsuccess = 1;
    this.trip = {
      location: null,
      name: null,
      datestart: null,
      dateend: null,
      members: null,
      owner: null,
      description: null
    };
    setTimeout(function() {
      this.createsuccess = false;
      }.bind(this), 3000);
  }
}
