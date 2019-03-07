import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'app/trips/trip';
import { Traveller } from 'app/travellers/traveller';
import { Marker } from '../marker';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';

declare var google: any;

@Component({
  selector: 'app-trip-hub',
  templateUrl: './trip-hub.component.html',
  styleUrls: ['./trip-hub.component.css'],
  providers: []
})
export class TripHubComponent implements OnInit {
  @Input()
  private trip: Trip = this._userData.getTripData();
  @Input()
  private user: Traveller = this._userData.getUserData();

  private iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  private icons = {
    Temp: {
      icon: this.iconBase + 'arrow_maps.png'
    },
    Lodging: {
      icon: this.iconBase + 'lodging_maps.png'
    },
    Dining: {
      icon: this.iconBase + 'dining_maps.png'
    },
    Drinking: {
      icon: this.iconBase + 'bars_maps.png'
    },
    Shopping: {
      icon: this.iconBase + 'euro_maps.png'
    },
    Sightseeing: {
      icon: this.iconBase + 'camera_maps.png'
    },
    Other: {
      icon: this.iconBase + 'info_circle_maps.png'
    }
  };
  public tempMarker = new google.maps.Marker({
    icon: this.icons['Temp'].icon,
  });
  private map;
  public marker: Marker = {
    coords: null,
    type: 'Other',
    creator: null,
    note: null
  };

  constructor(public _userData: UserDataService) { }

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(this.trip.coords[0], this.trip.coords[1]),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    this.map.setOptions({
      disableDefaultUI: true
    });
    this.tempMarker.setMap(this.map);

    google.maps.event.addListener(this.map, 'click', (event) => {
      this.tempMarker.setPosition(event.latLng);
    });
  }
  confirmMarker() {

    let marker = new google.maps.Marker({
      position: this.tempMarker.getPosition(),
      map: this.map,
      icon: this.icons[this.marker.type].icon,
    });
    this.marker.creator = this.user;
    let infoWindowText: String = '<b>Added by ' + this.marker.creator.firstname + '</b>' + '<br><br>' + this.marker.note;
    const infowindow = new google.maps.InfoWindow({
      content: infoWindowText
    });
    marker.addListener('click', function() {
        infowindow.open(this.map, marker);
    });
    this.tempMarker.setPosition(null);
    this.marker.note = '';
    this.marker.type = 'Other';
  }

  cancelMarker() {
    this.tempMarker.setPosition(null);
    this.marker.note = '';
    this.marker.type = 'Other';
  }
}
