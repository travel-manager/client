import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from './notification';
import { TripService } from 'app/trips/trip.service';
import {UserDataService} from 'app/app.component.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-feed',
  templateUrl: './trip-feed.component.html',
  styleUrls: ['./trip-feed.component.css'],
  providers: [TripService, DatePipe]
})
export class TripFeedComponent implements OnInit, OnDestroy {

  private tripId: number;
  private updateInterval;

  notifications: Notification[] = [];

  constructor(private tripService: TripService, private _userData: UserDataService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.tripId = this._userData.getTripData().id;
    this.updateFeed();
    this.updateInterval = setInterval(() => {this.updateFeed()}, 3000);
    this.scrollFeed();
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  updateFeed() {
    this.tripService
    .getNotificationsByTripId(this.tripId)
    .then((notifications: Notification[]) => {
      if (this.notifications.length !== notifications.length) {
        this.scrollFeed();
      }
      this.notifications = notifications;
    });
  }

  scrollFeed() {
    setTimeout(function() {
     const feedBox = document.getElementById('notifications');
     feedBox.scrollTop = feedBox.scrollHeight;
     }.bind(this), 100);
   }

   getEndOfContent(contentString: string) {
     return contentString.split(/ (.+)/)[1];
   }

}
