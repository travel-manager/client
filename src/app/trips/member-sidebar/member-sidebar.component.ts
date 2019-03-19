import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import {UserDataService} from 'app/app.component.service';

@Component({
  selector: 'app-member-sidebar',
  templateUrl: './member-sidebar.component.html',
  styleUrls: ['./member-sidebar.component.css'],
  providers: [TripService]
})
export class MemberSidebarComponent implements OnInit {

 members: Traveller[] = [];
  selectedTraveller: Traveller
  constructor(private tripService: TripService, private _userData: UserDataService) { }

  ngOnInit() {
    let trip: Trip = this._userData.getTripData();
    this.members = trip.members;

  }

  selectTraveller(traveller:Traveller) {
  }
}



