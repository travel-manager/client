import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {UserDataService} from 'app/app.component.service';

declare var google: any;

@Component({
  selector: 'app-public-trips',
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  providers: [TripService]
})
export class PublicTripsComponent implements OnInit {

  private filterStart: Date;
  private filterEnd: Date;
  private map;
  private location;
  trips: Trip[];
  constructor(public _userData: UserDataService, private tripService: TripService, public datepipe: DatePipe) { }

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(52.5200, 13.4050),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    this.map.setOptions({
      disableDefaultUI: true
    });

    this.tripService
      .getTrips()
      .then((trips: Trip[]) => {
        this.trips = trips;
        for (let trip of this.trips) {
          let marker = new google.maps.Marker({
            position: { lat: trip.coords[0], lng: trip.coords[1] },
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/kml/paddle/red-stars_maps.png'
          });
          const startString = this.datepipe.transform(new Date(trip.datestart), 'dd.MM.yy');
          const endString = this.datepipe.transform(new Date(trip.dateend), 'dd.MM.yy');
          let infoWindowText: String =
            '<b>' + trip.name + '</b><br>' +
            'Created by ' + trip.owner.username + '<br>' +
            trip.location + '<br><br>' +
            startString + ' – ' + endString + '<br><br>' +
            trip.description + '<br><br>'
            // + '<button disabled id="joinbtn" class="btn btn-primary">Join trip [Ei käytössä]</button>'
            ;
          const infowindow = new google.maps.InfoWindow({
            content: infoWindowText
          });
          marker.addListener('click', function() {
              infowindow.open(this.map, marker);
          });
        }
      });
  }
  updateDates = (startdate: NgbDate, enddate: NgbDate) => {
    this.filterStart =  new Date(startdate.year, startdate.month - 1, startdate.day);
    this.filterEnd = new Date(enddate.year, enddate.month - 1, enddate.day);
    console.log('startdate: ', this.filterStart);
    console.log('result:', this.tripService.getTripsByDates(this.filterStart));
  }

  filterTrips() {

  }

  goToTrip(trip: Trip) {

    this._userData.setTripData(trip);
    this._userData.setView('trip');
  }
}
