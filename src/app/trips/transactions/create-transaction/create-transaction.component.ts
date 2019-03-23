import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { TripService } from 'app/trips/trip.service';
import { UserDataService } from 'app/app.component.service';
import { Transaction } from '../transaction';
import { TravellerService } from 'app/travellers/traveller.service';
import { Membership } from 'app/trips/membership';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
  providers: [TripService, TravellerService]
})
export class CreateTransactionComponent implements OnInit {

  public createsuccess = 0;
  public freeloaders;
  public selectedAmount = '';
  public selectedSubject = '';
  public tripMembers: Traveller[] = [];

  constructor (private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) {}

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
            this.tripMembers.push(traveller);
            });
          }
        }
      });
  }

  createTransactions() {
    const payer = this._userData.getUserData().username;
    const amountPerFreeloader = +this.selectedAmount / this.freeloaders.length;
    for (const freeloader of this.freeloaders) {
      const transaction: Transaction = {
        payer: payer,
        amount: amountPerFreeloader,
        subject: this.selectedSubject,
        freeloader: freeloader,
        date: new Date()
      };
      console.log(transaction);
      //this.tripService.createTransaction(transaction);
    }
  }
}
