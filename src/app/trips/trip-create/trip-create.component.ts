import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { GeoProvider } from './geoProvider';
import { UserDataService } from 'app/app.component.service';
import { Membership } from '../membership';

declare var google: any;

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  providers: [TripService, GeoProvider]
})

export class TripCreateComponent implements OnInit {

  mapCoords;
  mapDestination: string;
  mapOpen = false;
  mapConfirmEnabled = false;
  private map;
  public targetMarker = new google.maps.Marker({
    position: null,
    icon: 'https://maps.google.com/mapfiles/kml/shapes/arrow_maps.png',
    animation: google.maps.Animation.BOUNCE,
    draggable: true
  });
  public createsuccess = 0;
  public trip: Trip = {
    location: null,
    name: null,
    picture: null,
    datestart: null,
    lat: null,
    long: null,
    dateend: null,
    owner: null,
    description: '',
    public: false
  };

  constructor (
    private gp: GeoProvider,
    private tripService: TripService,
    private _userData: UserDataService) {}

  ngOnInit() {
    this.generateMap();
  }

  updateDates = (startdate: NgbDate, enddate: NgbDate) => {
    this.trip.datestart =  new Date(startdate.year, startdate.month - 1, startdate.day);
    this.trip.dateend = new Date(enddate.year, enddate.month - 1, enddate.day);
  }

  shuffleCoord(inValue: number): number{
    return +(inValue + (Math.floor(Math.random()) * 2 - 0.5) * 0.1 * (0.5 + Math.random())).toFixed(7);
  }

  createTrip(lat: number, lng: number) {
    if (this.trip.datestart != null && this.trip.dateend != null) {
      this.tripService.getTripsByCoords(lat, lng).then(trips => {
        if (trips.length > 0) {
          this.trip.lat = this.shuffleCoord(lat);
          this.trip.long = this.shuffleCoord(lng);
        } else {
          this.trip.lat = lat;
          this.trip.long = lng;
        }
        this.trip.owner = this._userData.getUserData().username;
        const membership = new Membership;
        this.trip.picture = 'trip-default';
        this.tripService.createTrip(this.trip).then(createdTrip => {
          this._userData.setTripData(createdTrip);
          membership.travellerId = this._userData.getUserData()._id;
          membership.tripId = createdTrip._id;
          this.tripService.createMembership(membership);
          this._userData.setView('trip');
        });
      });
    } else {
      this.createsuccess = -1;
      setTimeout(function() {
        this.createsuccess = 0;
        }.bind(this), 3000);
    }
  }

  setTripCoords() {
    let lat: number;
    let lng: number;
    if (this.mapDestination !== this.trip.location) {
      this.gp.getCoords(this.trip.location).then(data => {
        lat = data['lat'];
        lng = data['lng'];
        if (lat !== null) {
          this.createTrip(lat, lng);
        } else {
          this.createsuccess = -2;
          this.trip.location = null;
          setTimeout(function() {
            this.createsuccess = 0;
            }.bind(this), 3000);
        }
      });
    } else {
      lat = this.mapCoords.lat();
      lng = this.mapCoords.lng();
      this.createTrip(lat, lng);
    }
  }

  setMap(bool: boolean) {
    this.mapOpen = bool;
  }

  confirmMap() {
    this.mapCoords = this.targetMarker.getPosition();
    this.gp.getAddress(this.mapCoords.lat(), this.mapCoords.lng()).then(address => {
      this.mapDestination = address['city'] + ', ' + address['country'];
      this.trip.location = this.mapDestination;
      this.setMap(false);
    });
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
    this.targetMarker.setMap(this.map);
    this.targetMarker.setPosition(this.mapCoords);
    setTimeout(function() {
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.targetMarker.setPosition(event.latLng);
        this.mapConfirmEnabled = true;
       });
      }.bind(this), 200);
  }
}
