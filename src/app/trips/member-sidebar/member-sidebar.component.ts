import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import {UserDataService} from 'app/app.component.service';
import { Membership } from '../membership';

@Component({
  selector: 'app-member-sidebar',
  templateUrl: './member-sidebar.component.html',
  styleUrls: ['./member-sidebar.component.css'],
  providers: [TripService, TravellerService]
})
export class MemberSidebarComponent implements OnInit, OnDestroy {

  @Input()
  changeHubTab: Function;

  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  private myId;
  public trip: Trip;
  public userIsOwner = false;
  private updateInterval;
  members: Traveller[] = [];
  memberships: Membership[] = [];
  selectedTraveller: Traveller;
  constructor(private tripService: TripService, private travellerService: TravellerService, private _userData: UserDataService) { }

  ngOnInit() {
    this.myId = this._userData.getUserData()._id;
    this.trip = this._userData.getTripData();
    if (this._userData.getUserData().username === this.trip.owner) {
      this.userIsOwner = true;
    } else {
      this.userIsOwner = false;
    }
    this.memberships = [];
    this.updateMemberships();
    this.updateInterval = setInterval(() => {this.updateMemberships()}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

  updateMemberships() {
    this.tripService
      .getMembershipsByTripId(this.trip._id)
      .then((memberships: Membership[]) => {
        if (memberships.length !== this.memberships.length) {
          this.memberships = memberships;
          this.updateMembers();
        }
      });
  }

  updateMembers() {
    this.members = [];
    for (const membership of this.memberships) {
      if (membership.travellerId !== this.myId) {
        this.travellerService
        .getTravellerById(membership.travellerId)
        .then((traveller: Traveller) => {
          this.members.push(traveller);
        });
      }
    }
  }

  selectTraveller(traveller: Traveller) {
    if (traveller !== this.selectedTraveller) {
      this.selectedTraveller = traveller;
    } else {
      this.selectedTraveller = null;
    }
  }

  goToAddNew() {
    this.changeHubTab('options');
  }
}
