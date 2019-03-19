import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Traveller } from '../travellers/traveller';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transactions/transaction';

@Injectable()
export class TripService {
    private tripsUrl = '/api/trips';
    private tripsOwnerUrl = '/owner';
    private tripsDatesUrl = '/dates';
    private transactionsUrl = '/api/transactions';

    constructor (private http: Http, private http2: HttpClient) {}

    // get("/api/trips")
    getTrips(): Promise<Trip[]> {
      return this.http.get(this.tripsUrl)
                 .toPromise()
                 .then(response => response.json() as Trip[])
                 .catch(this.handleError);
    }


    // post("/api/trips")
    createTrip(newTrip: Trip): Promise<Trip> {
      return this.http.post(this.tripsUrl, newTrip)
                 .toPromise()
                 .then(response => response.json() as Trip)
                 .catch(this.handleError);
    }

    // delete("/api/trips/:id")
    deleteTrip(delTripId: String): Promise<String> {
      return this.http.delete(this.tripsUrl + '/' + delTripId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/trips/:id")
    updateTrip(putTrip: Trip): Promise<Trip> {
      const putUrl = this.tripsUrl + '/' + putTrip._id;
      return this.http.put(putUrl, putTrip)
                 .toPromise()
                 .then(response => response.json() as Trip)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }

    getTripsByOwner(owner: Traveller): Promise<Trip[]> {
      const ownerString: string = encodeURI(JSON.stringify(owner));
      const callString: string = this.tripsUrl + this.tripsOwnerUrl + '/' + ownerString;
      console.log(callString);
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }

    getTripsByDates(startdate: Date): Promise<Trip[]> {
      const callString: string = this.tripsUrl + this.tripsDatesUrl + '/' + encodeURI(startdate.toDateString());
      console.log(callString);
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }

    createTransaction(newTransaction: Transaction): Promise<Transaction> {
      return this.http.post(this.transactionsUrl, newTransaction)
                 .toPromise()
                 .then(response => response.json() as Transaction)
                 .catch(this.handleError);
    }
}
