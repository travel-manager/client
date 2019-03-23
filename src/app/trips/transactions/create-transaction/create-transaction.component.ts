import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { TripService } from 'app/trips/trip.service';
import { UserDataService } from 'app/app.component.service';
import { Transaction } from '../transaction';
import { TravellerService } from 'app/travellers/traveller.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
  providers: [TripService, TravellerService]
})
export class CreateTransactionComponent implements OnInit {

  public createsuccess = 0;
  public transaction: Transaction = {
    payer: null,
    freeloader: null,
    amount: 0,
    date: null,
    subject: null
  };
  public freeloaderUsername: string;
  public selectedAmount: string;

  constructor (private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) {}

  ngOnInit() {
  }

  createTransaction() {
    this.transaction.payer = this._userData.getUserData().username;
    this.transaction.freeloader = this.freeloaderUsername;
    this.transaction.amount = +this.selectedAmount;
    this.tripService.createTransaction(this.transaction);
    console.log(this.transaction);
  }

  updateSelectedFreeloader(event: string): void{
    this.freeloaderUsername = event;
  }
}
