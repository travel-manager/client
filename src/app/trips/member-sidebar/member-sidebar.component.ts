import { Component, OnInit } from '@angular/core';
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
export class MemberSidebarComponent implements OnInit {

  public profilePictureUrl = 'https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/';
  members: Traveller[] = [];
  memberships: Membership[] = [];
  selectedTraveller: Traveller;
  constructor(private tripService: TripService, private travellerService: TravellerService, private _userData: UserDataService) { }

  ngOnInit() {
    const myId = this._userData.getUserData()._id;
    this.tripService
      .getMembershipsByTripId(this._userData.getTripData()._id)
      .then((memberships: Membership[]) => {
        for (const membership of memberships) {
          if (membership.travellerId !== myId) {
            this.travellerService
            .getTravellerById(membership.travellerId)
            .then((traveller: Traveller) => {
              this.members.push(traveller);
            });
          }
        }
      });
  }

  selectTraveller(username: string) {
    console.log('selected ' + username);
  }
}
