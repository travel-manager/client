import { Component, OnInit } from '@angular/core';
import { UserDataService } from './app.component.service';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from 'app/trips/trip'

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  public view: string;
  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  
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
  selectedId: number = null;
  
  constructor(public _userData: UserDataService) {
    }

  ngOnInit() {
    this.generateMap();
  }

  setView(view: string) {
    if (this._userData.getView() !== view) {
      this._userData.setView(view);
    } else {
      this._userData.setView('start');
    }
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
  }
}
