import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from './message'
import { TripService } from 'app/trips/trip.service';
import {UserDataService} from 'app/app.component.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-trip-chat',
  templateUrl: './trip-chat.component.html',
  styleUrls: ['./trip-chat.component.css'],
  providers: [TripService, DatePipe]
})
export class TripChatComponent implements OnInit, OnDestroy {
  private tripId: string;
  private updateInterval;
  message: Message = {
    sender: null,
    timestamp: null,
    content: null,
    tripId: null,
  };

  messages: Message[] = [];
  constructor(private tripService: TripService, private _userData: UserDataService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.tripId = this._userData.getTripData()._id;
    this.updateChat();
    this.updateInterval = setInterval(() => {this.updateChat()}, 500);
    this.scrollChat();
  }
  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  updateChat() {
    this.tripService
    .getMessagesByTripId(this.tripId)
    .then((messages: Message[]) => {
      if (this.messages.length !== messages.length) {
        this.scrollChat();
      }
      this.messages = messages;
    });
  }

  scrollChat() {
   setTimeout(function() {
    const chatBox = document.getElementById('messages');
    chatBox.scrollTop = chatBox.scrollHeight;
    }.bind(this), 100);

  }

  postMessage() {
    this.message.tripId = this.tripId;
    this.message.sender = this._userData.getUserData().username;
    this.message.timestamp = this.datePipe.transform(new Date(), 'HH:mm:ss: dd.MM.yy').toString();
   this.tripService.createMessage(this.message);
    this.updateChat();
    this.message.content = '';
  }



}
