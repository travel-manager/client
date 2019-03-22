import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Membership } from './membership';
import { Traveller } from '../travellers/traveller';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Message } from './trip-hub/trip-chat/message'
@Injectable()
export class TripService {
    private tripsUrl = '/api/trips';
    private tripsDatesUrl = '/dates';
    private messagesUrl = '/api/messages';
    private membershipsUrl = '/api/memberships';

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

    getTripsByDates(startdate: Date): Promise<Trip[]> {
      const callString: string = this.tripsUrl + this.tripsDatesUrl + '/' + encodeURI(startdate.toDateString());
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }


    getMessagesByTripId(tripId: String): Promise<Message[]> {
      const callString: string = this.messagesUrl + '/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Message[])
                 .catch(this.handleError);
    }

    createMessage(newMessage: Message): Promise<Message> {
      return this.http.post(this.messagesUrl, newMessage)
                 .toPromise()
                 .then(response => response.json() as Message)
                 .catch(this.handleError);
    }

    createMembership(newMembership: Membership): Promise<Membership> {
      return this.http.post(this.membershipsUrl, newMembership)
                 .toPromise()
                 .then(response => response.json() as Membership)
                 .catch(this.handleError);
    }

    getMembershipsByTravellerId(travellerId: String): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/travellerId/' + travellerId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    getTripById(tripId: String): Promise<Trip> {
      const callString: string = this.tripsUrl + '/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }
}
