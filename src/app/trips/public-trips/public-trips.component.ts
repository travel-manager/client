import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { Membership } from '../membership';
import { TripService } from '../trip.service';
import { DatePipe } from '@angular/common';
import {UserDataService} from 'app/app.component.service';
import {FormControl} from '@angular/forms';
import {Notification} from 'app/trips/trip-hub/trip-feed/notification'

declare var google: any;

@Component({
  selector: 'app-public-trips',
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  providers: [TripService]
})
export class PublicTripsComponent implements OnInit {

  public testString = 'test';
  public joinStatus;
  private myId: number = null;
  selectedPictureUrl: string = null;
  selectedId: number = null;
  selectedDatesString: string = null;
  selectedTrip: Trip = {
    location: null,
    name: null,
    picture: null,
    datestart: null,
    latitude: null,
    longitude: null,
    dateend: null,
    owner: null,
    description: null,
    isPublic: null
  };
  private map;
  trips: Trip[];
  startDate = new FormControl();
  endDate = new FormControl();
  markers = [];

  constructor(public _userData: UserDataService, private tripService: TripService, public datepipe: DatePipe) { }

  ngOnInit() {
    try {
      this.myId = null;
      this.myId = this._userData.getUserData().id; } catch (e) {}
    if (this._userData.getView() === 'findtrips') {
      setTimeout(function() {
        this.generateMap();
        }.bind(this), 200);
    }
  }

  filterTrips() {
    let startDate;
    let endDate;
    if (this.startDate.value == null) {
      startDate = new Date(0, 0, 1);
    } else {
      startDate = this.startDate.value;
    }
    if (this.endDate.value == null) {
      endDate = new Date(3000, 0, 1);
    } else {
      endDate = this.endDate.value;
    }
    this.tripService.getTripsByDates(startDate, endDate).then(trips => {
      this.trips = trips;
      this.placeTripMarkers();
    })
  }

  generateMap() {
    try {
      const head: any = document.getElementsByTagName('head')[0];

      const insertBefore = head.insertBefore;
      head.insertBefore = function (newElement, referenceElement) {
          if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
              return;
          }
          insertBefore.call(head, newElement, referenceElement);
      };
    } catch {}
    let mapProp = {
      center: new google.maps.LatLng(52.5200, 13.4050),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    this.map.setOptions({
      disableDefaultUI: true,
      restriction: {
        latLngBounds: {
          north: 84.9,
          south: -84.9,
          west: -168.00,
          east: -168.01,
        },
        strictBounds: true
      }
    });
    this.map.addListener('click', () => {
      this.selectedTrip = null;
      this.selectedId = null;
    });
    this.filterTrips();
  }
  placeTripMarkers() {
    for (let i = 0; i < this.markers.length; i++ ) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    for (let trip of this.trips) {
      let marker = new google.maps.Marker({
        position: { lat: trip.latitude, lng: trip.longitude },
          map: this.map,
          icon: 'http://maps.google.com/mapfiles/kml/paddle/red-stars_maps.png'
      });
      marker.addListener('click', () => {
        this.selectedTrip = trip;
        this.selectedId = trip.id;
        if (this.myId !== null) {
          this.tripService.getMembershipsByTravellerAndTripId(this.myId, trip.id).then(memberships => {
            if (memberships.length > 0) {
              this.joinStatus = 1;
            } else {
                this.joinStatus = 0;
             }
          })
        } else {
          this.joinStatus = -1;
        }
        this.selectedPictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/' + trip.picture;
        const startString = this.datepipe.transform(new Date(trip.datestart), 'dd.MM.yy');
        const endString = this.datepipe.transform(new Date(trip.dateend), 'dd.MM.yy');
        this.selectedDatesString = startString + ' – ' + endString;
      });
      this.markers.push(marker);
    }
  }

  joinTrip(tripId: number) {
    const membership: Membership = {
      travellerId: this.myId,
      tripId: tripId
    }
    const notification: Notification = {
      content: this._userData.getUserData().username + ' joined trip',
      tripId: tripId,
      type: 'joined',
      timestamp: null,
      icon: 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/icon-joined'
    }
    this.tripService.createMembership(membership);
    this.tripService.createNotification(notification);
    this._userData.setTripData(this.selectedTrip);
    this._userData.setView('trip');
  }

  goToLogin() {
    this._userData.setView('login');
  }

  goToTrip(trip: Trip) {

    this._userData.setTripData(trip);
    this._userData.setView('trip');
  }
}
