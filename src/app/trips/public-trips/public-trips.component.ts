import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';

declare var google: any;

@Component({
  selector: 'app-public-trips',
  templateUrl: './public-trips.component.html',
  styleUrls: ['./public-trips.component.css'],
  providers: [TripService]
})
export class PublicTripsComponent implements OnInit {

  private map;
  trips: Trip[];
  constructor(private tripService: TripService) { }

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
          let infoWindowText: String =
            '<b>' + trip.name + '</b><br>' +
            'Created by ' + trip.owner.username + '<br>' +
            trip.location + '<br><br>' +
            trip.datestart + ' – ' + trip.dateend + '<br><br>' +
            trip.description + '<br><br>' +
            '<button disabled class="btn btn-primary">Join trip</button>'
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
}
