import { Component, OnInit } from '@angular/core';
import { Traveller } from 'app/travellers/traveller';
import { TripService } from 'app/trips/trip.service';
import { UserDataService } from 'app/app.component.service';
import { Transaction } from '../transaction';
import { TravellerService } from 'app/travellers/traveller.service';
import { Membership } from 'app/trips/membership';
import { Subject } from 'rxjs';
import { Trip } from 'app/trips/trip';


@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
  providers: [TripService, TravellerService]
})
export class CreateTransactionComponent implements OnInit {

  public createsuccess = 0;
  public freeloaders: string[] = [];
  public selectedAmount;
  public amountPerFreeloader = 0;
  public selectedSubject = '';
  selectedUnit = '€';
  public tripMembers: Traveller[] = [];
  public selectedTab = 'show';
  private user: Traveller;
  private trip: Trip;
  public toPayTransactions: Transaction [] = [];
  public toReceiveTransactions : Transaction [] = [];
  unitOptions: string[] = [ '€', '$' ];

  constructor (private tripService: TripService, private travellerService: TravellerService, public _userData: UserDataService) {}

  ngOnInit() {
    this.user = this._userData.getUserData();
    this.trip = this._userData.getTripData();
    this.tripService
      .getMembershipsByTripId(this.trip.id)
      .then((memberships: Membership[]) => {
        for (const membership of memberships) {
          if (membership.travellerId !== this.user.id) {
            this.travellerService
            .getTravellerById(membership.travellerId)
            .then((traveller: Traveller) => {
            this.tripMembers.push(traveller);
            });
          }
        }
      });
      this.updateTransactionsList();
  }

  setTab(tab: string){
    this.selectedTab = tab;
  }

  updateAmountPer() {
    let totalToSplit = 0;
    if (this.selectedAmount == null) {
      totalToSplit = 0;
    } else {
      totalToSplit = this.selectedAmount;
    }
    this.amountPerFreeloader = +(totalToSplit / (1 + +(this.freeloaders.length))).toFixed(2);
  }

  createTransactions() {
    const payer = this._userData.getUserData().username;
    for (const freeloader of this.freeloaders) {
      const transaction: Transaction = {
        payer: payer,
        amount: this.amountPerFreeloader,
        unit: this.selectedUnit,
        subject: this.selectedSubject,
        freeloader: freeloader,
        timestamp: null,
        tripId: this.trip.id
      };
      this.tripService.createTransaction(transaction).then(result => {
        this.updateTransactionsList();
        this.setTab('show');
      });
    }
  }
  updateTransactionsList()  {
    this.tripService.getTransactionsByFreeloaderAndTripId(this.user.username, this.trip.id).then(transactions => {
      for (const transaction of transactions) {
        if (transaction.subject.length > 0) {
          transaction.subject = '"' + transaction.subject + '"';
        }
      }
      this.toPayTransactions = transactions
    });
    this.tripService.getTransactionsByPayerAndTripId(this.user.username, this.trip.id).then(transactions => {
      for (const transaction of transactions) {
        if (transaction.subject.length > 0) {
          transaction.subject = '"' + transaction.subject + '"';
        }
      }
      this.toReceiveTransactions = transactions;
      this.scrollTransactions();
    });
  }

  scrollTransactions() {
    const transactionBox = document.getElementById('transactions');
    transactionBox.scrollTop =  transactionBox.scrollHeight;
  }

  deleteTransaction(id: number) {
    this.tripService.deleteTransaction(id).then(response => {
      this.updateTransactionsList()
    });
  }
}
