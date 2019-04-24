import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Membership } from './membership';
import { Traveller } from '../travellers/traveller';
import { Http, Response } from '@angular/http';
import { Transaction } from './transactions/transaction';
import { Message } from './trip-hub/trip-chat/message';
import { Marker } from './trip-hub/marker';
import { Notification } from './trip-hub/trip-feed/notification';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


/*@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://835488de.ngrok.io';
    if (!req.url.includes('/keys/') && !req.url.includes('/image-upload/')) {
      req = req.clone({
        url: url + req.url
      });
    }
    console.log(req);
    return next.handle(req);
  }
}*/


@Injectable()
export class TripService {
    private tripsUrl = '/trips';
    private tripsDatesUrl = '/dates';
    private transactionsUrl = '/transactions';
    private messagesUrl = '/messages';
    private membershipsUrl = '/memberships';
    private markersUrl = '/markers';
    private notificationsUrl = '/notifications';

    constructor (private http: HttpClient) {}

    // get("/api/trips")
    getTrips(): Promise<Trip[]> {
      return this.http.get(this.tripsUrl)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }


    // post("/api/trips")
    createTrip(newTrip: Trip): Promise<Trip> {
      return this.http.post(this.tripsUrl, newTrip)
                 .toPromise()
                 .then(response => response as Trip)
                 .catch(this.handleError);
    }

    // put("/api/trips/:id")
    updateTrip(putTrip: Trip): Promise<Trip> {
      const putUrl = this.tripsUrl + '/put/' + putTrip.id;
      return this.http.put(putUrl, putTrip)
                 .toPromise()
                 .then(response => response as Trip)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }

    public getTripsByDates(startdate: Date, enddate: Date): Promise<Trip[]> {
      const callString: string = this.tripsUrl + '/byDate?startdate=' + startdate.toISOString() + '&enddate=' + enddate.toISOString();
      return this.http.get(callString).toPromise()
      .then(response => response as Trip[])
    }

    public getTripsByCoords(lat: number, lng: number): Promise<Trip[]> {
      const callString: string = this.tripsUrl + '/byLongAndLat?latitude=' + lat + '&longitude=' + lng;
      return this.http.get(callString).toPromise()
      .then(response => response as Trip[])
    }

    createMessage(newMessage: Message): Promise<Message> {
      return this.http.post(this.messagesUrl, newMessage)
                 .toPromise()
                 .then(response => response as Message)
                 .catch(this.handleError);
    }

    createNotification(newNotification: Notification): Promise<Notification> {
      return this.http.post(this.notificationsUrl, newNotification)
                 .toPromise()
                 .then(response => response as Notification)
                 .catch(this.handleError);
    }

    createMembership(newMembership: Membership): Promise<Membership> {
      return this.http.post(this.membershipsUrl, newMembership)
                 .toPromise()
                 .then(response => response as Membership)
                 .catch(this.handleError);
    }

    getMembershipsByTravellerId(travellerId: number): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/get?travellerId=' + travellerId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    deleteMembership(delMShipId: number): Promise<String> {
      return this.http.delete(this.membershipsUrl + '/delete/' + delMShipId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    getMembershipsByTripId(tripId: number): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/get?tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    getMembershipsByTravellerAndTripId(travellerId: number, tripId: number): Promise<Membership[]> {
      const callString: string = this.membershipsUrl + '/get?travellerId=' + travellerId + '&tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Membership[])
                 .catch(this.handleError);
    }

    createMarker(newMarker: Marker): Promise<Marker> {
      return this.http.post(this.markersUrl, newMarker)
                 .toPromise()
                 .then(response => response as Marker)
                 .catch(this.handleError);
    }

    deleteMarker(delMarkerId: number): Promise<String> {
      return this.http.delete(this.markersUrl + '/delete/' + delMarkerId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    deleteMembershipsByTripId(delTripId: number): Promise<String> {
      return this.http.delete(this.membershipsUrl + '/delete?tripId=' + delTripId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    deleteMarkersByTripId(delTripId: number): Promise<String> {
      return this.http.delete(this.markersUrl + '/delete?tripId=' + delTripId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    deleteMessagesByTripId(delTripId: number): Promise<String> {
      return this.http.delete(this.messagesUrl + '/delete?tripId=' + delTripId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    deleteTrip(delTripId: number): Promise<String> {
      this.http.delete(this.membershipsUrl + '/delete?tripId=' + delTripId);
      this.http.delete(this.markersUrl + '/delete?tripId=' + delTripId);
      this.http.delete(this.messagesUrl + '/delete?tripId=' + delTripId);
      this.http.delete(this.notificationsUrl + '/delete?tripId=' + delTripId);
      return this.http.delete(this.tripsUrl + '/delete/' + delTripId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    getMessagesByTripId(tripId: number): Promise<Message[]> {
      const callString: string = this.messagesUrl + '/get/' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Message[])
                 .catch(this.handleError);
    }

    getNotificationsByTripId(tripId: number): Promise<Notification[]> {
      const callString: string = this.notificationsUrl + '/get?tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Notification[])
                 .catch(this.handleError);
    }


    getMarkersByTripId(tripId: number): Promise<Marker[]> {
      const callString: string = this.markersUrl + '/get?tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Marker[])
                 .catch(this.handleError);
    }

    getMarkerById(id: number): Promise<Marker> {
      const callString: string = this.markersUrl + '/get/' + id;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Marker[])
                 .catch(this.handleError);
    }

    getTripById(tripId: number): Promise<Trip> {
      const callString: string = this.tripsUrl + '/get/' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Trip[])
                 .catch(this.handleError);
    }

    createTransaction(newTransaction: Transaction): Promise<Transaction> {
      return this.http.post(this.transactionsUrl, newTransaction)
                 .toPromise()
                 .then(response => response as Transaction)
                 .catch(this.handleError);
    }
    getTransactionsByFreeloaderAndTripId(freeloader: String, tripId: number): Promise<Transaction[]> {
      const callString: string = this.transactionsUrl + '/get?freeloader=' + freeloader + '&tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Transaction[])
                 .catch(this.handleError);
    }
    getTransactionsByPayerAndTripId(payer: String, tripId: number): Promise<Transaction[]> {
      const callString: string = this.transactionsUrl + '/get?payer=' + payer + '&tripId=' + tripId;
      return this.http.get(callString)
                 .toPromise()
                 .then(response => response as Transaction[])
                 .catch(this.handleError);
    }
    deleteTransaction(delTransactionId: number): Promise<String> {
      return this.http.delete(this.transactionsUrl + '/delete/' + delTransactionId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }
}

