import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import {UserDataService} from 'app/app.component.service';
import { Membership } from '../membership';
import { Notification } from '../trip-hub/trip-feed/notification'

@Component({
  selector: 'app-member-sidebar',
  templateUrl: './member-sidebar.component.html',
  styleUrls: ['./member-sidebar.component.css'],
  providers: [TripService, TravellerService]
})
export class MemberSidebarComponent implements OnInit, OnDestroy {

  @Input()
  changeHubTab: Function;

  loadingStatus = false;
  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  public trip: Trip;
  public user: Traveller;
  public userIsOwner = false;
  private updateInterval;
  members: Traveller[] = [];
  memberships: Membership[] = [];
  selectedTraveller: Traveller;
  constructor(private tripService: TripService, private travellerService: TravellerService, private _userData: UserDataService) { }

  ngOnInit() {
    this.user = this._userData.getUserData();
    this.trip = this._userData.getTripData();
    if (this._userData.getUserData().username === this.trip.owner) {
      this.userIsOwner = true;
    } else {
      this.userIsOwner = false;
    }
    this.memberships = [];
    this.loadingStatus = true;
    this.updateMemberships();
    this.updateInterval = setInterval(() => {this.updateMemberships()}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  updateMemberships() {
    this.tripService.getTripById(this.trip.id).then(trip => {
      this.trip = trip;
    })
    this.tripService
      .getMembershipsByTripId(this.trip.id)
      .then((memberships: Membership[]) => {
        if (memberships.length <= 1) {
          this.loadingStatus = false;
        } else if (memberships.length !== this.memberships.length) {
          this.memberships = memberships;
          this.updateMembers();
        }
      });
  }

  transferLeadership = (newLeader: string) => {
    this.userIsOwner = false;
    this.trip = this._userData.getTripData();
    this.trip.owner = newLeader;
    this.tripService.updateTrip(this.trip);
    const notification: Notification = {
      content: newLeader + ' is now the trip leader!',
      tripId: this.trip.id,
      type: 'leader',
      timestamp: null,
      icon: 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/icon-owner'
    }
    this.tripService.createNotification(notification);
    this.changeHubTab('');
  }

  updateMembers() {
    this.members = [];
    for (const membership of this.memberships) {
      if (membership.travellerId !== this.user.id) {
        this.travellerService
        .getTravellerById(membership.travellerId)
        .then((traveller: Traveller) => {
          if (this.members.push(traveller) + 1 >= this.memberships.length) {
            this.loadingStatus = false;
          };
        });
      }
    }
  }

  selectTraveller(traveller: Traveller) {
    this.changeHubTab('');
    if (traveller !== this.selectedTraveller) {
      this.selectedTraveller = traveller;
    } else {
      this.selectedTraveller = null;
    }
  }

  closeSelection = () => {
    this.selectedTraveller = null;
  }

  goToAddNew() {
    this.changeHubTab('options');
  }
}
