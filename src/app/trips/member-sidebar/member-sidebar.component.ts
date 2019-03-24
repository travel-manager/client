import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { TravellerService } from 'app/travellers/traveller.service';
import {UserDataService} from 'app/app.component.service';
import { Membership } from '../membership';
import { interval } from 'rxjs';

@Component({
  selector: 'app-member-sidebar',
  templateUrl: './member-sidebar.component.html',
  styleUrls: ['./member-sidebar.component.css'],
  providers: [TripService, TravellerService]
})
export class MemberSidebarComponent implements OnInit {

  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  private myId;
  private tripId;
  members: Traveller[] = [];
  memberships: Membership[] = [];
  selectedTraveller: Traveller;
  constructor(private tripService: TripService, private travellerService: TravellerService, private _userData: UserDataService) { }

  ngOnInit() {
    this.myId = this._userData.getUserData()._id;
    this.tripId = this._userData.getTripData()._id;
    this.memberships = [];
    this.updateMemberships();
    interval(2000).subscribe(() => this.updateMemberships());
  }

  updateMemberships() {
    this.tripService
      .getMembershipsByTripId(this.tripId)
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

  selectTraveller(username: string) {
    console.log('selected ' + username);
  }
}
