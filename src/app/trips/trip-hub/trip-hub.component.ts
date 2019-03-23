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
  providers: [TripService]
})
export class TripHubComponent implements OnInit {

  private trip: Trip = this._userData.getTripData();

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
    this.generateMap();
  }
  confirmMarker() {
    let marker: Marker = {
      coords: { lat: this.targetMarker.getPosition().lat(), lng: this.targetMarker.getPosition().lng() },
      type: this.markerType,
      creator: this._userData.getUserData().username,
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
    let marker = new google.maps.Marker({
      position: markerParam.coords,
      map: this.map,
      icon: this.icons[markerParam.type].icon,
    });
    if (this.targetMarker.getPosition() != null) {
      marker.setAnimation(google.maps.Animation.DROP);
    }
    let infoWindowText: String = '<b>Added by ' + markerParam.creator + '</b>' + '<br><br>' + markerParam.note;
    const infowindow = new google.maps.InfoWindow({
      content: infoWindowText
    });
    marker.addListener('click', function() {
        infowindow.open(this.map, marker);
    });
  }

  cancelMarker() {
    this.targetMarker.setAnimation(null);
    this.targetMarker.setPosition(null);
    this.markerNote = '';
    this.markerType = 'Other';
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    if (this.selectedTab === 'map') {
      this.generateMap();

    }
  }

  generateMap() {
    this.tripService.getMarkersByTripId(this.trip._id).then (markers => {
      setTimeout(function() {
        let mapProp = {
          center: new google.maps.LatLng(this.trip.coords[0], this.trip.coords[1]),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
        this.map.setOptions({
          disableDefaultUI: true
        });
        this.targetMarker.setMap(this.map);
        google.maps.event.addListener(this.map, 'click', (event) => {
          this.targetMarker.setPosition(event.latLng);
          this.targetMarker.setAnimation(google.maps.Animation.BOUNCE);
        });
        for (let marker of markers) {
          this.placeMarker(marker);
        }
        }.bind(this), 200);
    });
  }
}
