import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Membership } from './membership';
import { Traveller } from '../travellers/traveller';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transactions/transaction';
import { Message } from './trip-hub/trip-chat/message';
import { Marker } from './trip-hub/marker';
import { Notification } from './trip-hub/trip-feed/notification';

@Injectable()
export class TripService {
    private tripsUrl = '/api/trips';
    private tripsDatesUrl = '/dates';
    private tripsCoordsUrl = '/coords';
    private transactionsUrl = '/api/transactions';
    private messagesUrl = '/api/messages';
    private membershipsUrl = '/api/memberships';
    private markersUrl = '/api/markers';
    private notificationsUrl = '/api/notifications';

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

    public getTripsByDates(startdate: Date, enddate: Date): Promise<Trip[]> {
      const callString: string = this.tripsUrl + this.tripsDatesUrl + '/' + startdate.toISOString() + 'to' + enddate.toISOString();
      return this.http.get(callString).toPromise()
      .then(response => response.json() as Trip[])
    }

    public getTripsByCoords(lat: number, lng: number): Promise<Trip[]> {
      const callString: string = this.tripsUrl + this.tripsCoordsUrl + '/' + lat + 'and' + lng;
      return this.http.get(callString).toPromise()
      .then(response => response.json() as Trip[])
    }

    createMessage(newMessage: Message): Promise<Message> {
      return this.http.post(this.messagesUrl, newMessage)
                 .toPromise()
                 .then(response => response.json() as Message)
                 .catch(this.handleError);
    }

    createNotification(newNotification: Notification): Promise<Notification> {
      return this.http.post(this.notificationsUrl, newNotification)
                 .toPromise()
                 .then(response => response.json() as Notification)
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

    deleteMembership(delMShipId: String): Promise<String> {
      return this.http.delete(this.membershipsUrl + '/' + delMShipId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    getMembershipsByTripId(tripId: String): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/tripId/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    getMembershipsByTravellerAndTripId(travellerId: string, tripId: string): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/' + travellerId + '&' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    createMarker(newMarker: Marker): Promise<Marker> {
      return this.http.post(this.markersUrl, newMarker)
                 .toPromise()
                 .then(response => response.json() as Marker)
                 .catch(this.handleError);
    }

    deleteMarker(delMarkerId: String): Promise<String> {
      return this.http.delete(this.markersUrl + '/' + delMarkerId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    deleteMembershipsByTripId(delTripId: String): Promise<String> {
      return this.http.delete(this.membershipsUrl + '/tripId/' + delTripId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    deleteMarkersByTripId(delTripId: String): Promise<String> {
      return this.http.delete(this.markersUrl + '/tripId/' + delTripId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    deleteMessagesByTripId(delTripId: String): Promise<String> {
      return this.http.delete(this.messagesUrl + '/tripId/' + delTripId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    deleteTrip(delTripId: String): Promise<String> {
      this.http.delete(this.membershipsUrl + '/tripId/' + delTripId);
      this.http.delete(this.markersUrl + '/tripId/' + delTripId);
      this.http.delete(this.messagesUrl + '/tripId/' + delTripId);
      this.http.delete(this.notificationsUrl + '/tripId/' + delTripId);
      return this.http.delete(this.tripsUrl + '/' + delTripId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    getMessagesByTripId(tripId: String): Promise<Message[]> {
      const callString: string = this.messagesUrl + '/tripId/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Message[])
                 .catch(this.handleError);
    }

    getNotificationsByTripId(tripId: String): Promise<Notification[]> {
      const callString: string = this.notificationsUrl + '/tripId/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Notification[])
                 .catch(this.handleError);
    }


    getMarkersByTripId(tripId: String): Promise<Marker[]> {
      const callString: string = this.markersUrl + '/tripId/' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Marker[])
                 .catch(this.handleError);
    }

    getMarkerById(id: String): Promise<Marker> {
      const callString: string = this.markersUrl + '/' + id;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Marker[])
                 .catch(this.handleError);
    }

    getTripById(tripId: String): Promise<Trip> {
      const callString: string = this.tripsUrl + '/' + tripId;
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
    getTransactionsByFreeloaderAndTripId(freeloader: String, tripId: String): Promise<Transaction[]> {
      const callString: string = this.transactionsUrl + '/freeloader/' + freeloader + 'OnTrip' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Transaction[])
                 .catch(this.handleError);
    }
    getTransactionsByPayerAndTripId(payer: String, tripId: String): Promise<Transaction[]> {
      const callString: string = this.transactionsUrl + '/payer/' + payer + 'OnTrip' + tripId;
      return this.http2.get(callString)
                 .toPromise()
                 .then(response => response as Transaction[])
                 .catch(this.handleError);
    }
    deleteTransaction(delTransactionId: String): Promise<String> {
      return this.http.delete(this.transactionsUrl + '/' + delTransactionId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }
}

