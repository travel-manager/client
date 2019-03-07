import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Http, Response } from '@angular/http';

@Injectable()
export class TripService {
    private tripsUrl = '/api/trips';
    private tripOwnerUrl = '/api/trips/owner/';

    constructor (private http: Http) {}

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

    // get("/api/trips/username/:id")
    getTrip(getTripId: String): Promise<Trip> {
      return this.http.get(this.tripsUrl + this.tripsUrl + '/' + getTripId)
                 .toPromise()
                 .then(response => response.json() as Trip[])
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

    // get("/api/trips/username/:id")
    /* getTripsByOwnerId(id: string): Promise<Trip> {
      return this.http.get(this.tripsUrl + this.tripsUrl + '/' + getTripId)
                 .toPromise()
                 .then(response => response.json() as Trip[])
                 .catch(this.handleError);
    } */
}
