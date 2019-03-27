import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'app/trips/trip';
import { Traveller } from 'app/travellers/traveller';
import { Marker } from './marker';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';

declare var google: any;

@Component({
  selector: 'app-trip-hub',
  templateUrl: './trip-hub.component.html',
  styleUrls: ['./trip-hub.component.css'],
  providers: [TripService]
})
export class TripHubComponent implements OnInit {

  public selectedMarker: Marker = null;
  public selectedMarkerIcon: string;
  private trip: Trip;
  private user: Traveller;
  public userCanDeleteMarker: boolean;
  inputsEnabled = false;

  private iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  public selectedTab: string = 'map';
  public icons = {
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
      icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-stars_maps.png'
    }
  };
  public targetMarker = new google.maps.Marker({
    icon: this.icons['Temp'].icon,
    draggable: true
  });
  public markerType = 'Other';
  public markerNote = '';
  private map;

  constructor(private tripService: TripService, private _userData: UserDataService) { }

  ngOnInit() {
    this.trip = this._userData.getTripData();
    this.user = this._userData.getUserData();
    this.generateMap();
  }
  confirmMarker() {
    const marker: Marker = {
      lat: this.targetMarker.getPosition().lat(),
      long: this.targetMarker.getPosition().lng(),
      type: this.markerType,
      creator: this.user.username,
      tripId: this.trip._id,
      note: this.markerNote
    };
    this.placeMarker(marker);
    this.tripService.createMarker(marker);
    this.targetMarker.setAnimation(null);
    this.targetMarker.setPosition(null);
    this.markerNote = '';
    this.markerType = 'Other';
  }

  placeMarker(markerParam: Marker) {
    const marker = new google.maps.Marker({
      position: { lat: markerParam.lat, lng: markerParam.long },
      map: this.map,
      icon: this.icons[markerParam.type].icon,
    });
    if (this.targetMarker.getPosition() != null) {
      marker.setAnimation(google.maps.Animation.DROP);
    }
    marker.addListener('click', () => {
      if (this.selectedMarker == null) {
        this.selectedMarker = markerParam;
        this.selectedMarkerIcon = marker.icon;
        this.selectedMarkerIcon = this.selectedMarkerIcon.replace('_maps', '');
        this.cancelMarker();
        if (this.user.username === this.trip.owner || this.user.username === this.selectedMarker.creator ) {
          this.userCanDeleteMarker = true;
        } else {
          this.userCanDeleteMarker = false;
        }
      } else {
        this.selectedMarker = null;
      }
    });
  }

  cancelMarker() {
    this.targetMarker.setAnimation(null);
    this.targetMarker.setPosition(null);
    this.markerNote = '';
    this.markerType = 'Other';
  }

  deleteMarker(id: string) {
    this.tripService.deleteMarker(id).then(res => {
      this.generateMap();
      this.selectedMarker = null;
    })
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    if (this.selectedTab === 'map') {
      this.generateMap();
    }
  }

  generateMap() {
     this.tripService.getMarkersByTripId(this.trip._id).then (markers => {
          const mapProp = {
          center: new google.maps.LatLng(this.trip.lat, this.trip.long),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
        this.map.setOptions({
          disableDefaultUI: true
        });
        this.targetMarker.setMap(this.map);
        google.maps.event.addListener(this.map, 'click', (event) => {
          if (this.targetMarker.getPosition()  == null && this.selectedMarker == null) {
            this.inputsEnabled = false;
            setTimeout(function() {
              this.inputsEnabled = true;
              }.bind(this), 500);
          }
          this.selectedMarker = null;
          this.targetMarker.setPosition(event.latLng);
          this.targetMarker.setAnimation(google.maps.Animation.BOUNCE);
        });
        for (const marker of markers) {
          this.placeMarker(marker);
        }
    });
  }
}
