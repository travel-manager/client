import { Injectable } from '@angular/core';
import { Traveller } from './traveller';
import { Http, Response } from '@angular/http';

@Injectable()
export class TravellerService {
    private travellersUrl = '/api/travellers';
    private usernameUrl = '/username';

    constructor (private http: Http) {}

    // get("/api/travellers")
    getTravellers(): Promise<Traveller[]> {
      return this.http.get(this.travellersUrl)
                 .toPromise()
                 .then(response => response.json() as Traveller[])
                 .catch(this.handleError);
    }


    // post("/api/travellers")
    createTraveller(newTraveller: Traveller): Promise<Traveller> {
      return this.http.post(this.travellersUrl, newTraveller)
                 .toPromise()
                 .then(response => response.json() as Traveller)
                 .catch(this.handleError);
    }

    // get("/api/travellers/username/:username")
    getTraveller(getTravellerUsername: String): Promise<Traveller> {
      return this.http.get(this.travellersUrl + this.usernameUrl + '/' + getTravellerUsername)
                 .toPromise()
                 .then(response => response.json() as Traveller[])
                 .catch(this.handleError);
    }

    // delete("/api/travellers/:id")
    deleteTraveller(delTravellerId: String): Promise<String> {
      return this.http.delete(this.travellersUrl + '/' + delTravellerId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/travellers/:id")
    updateTraveller(putTraveller: Traveller): Promise<Traveller> {
      const putUrl = this.travellersUrl + '/' + putTraveller._id;
      return this.http.put(putUrl, putTraveller)
                 .toPromise()
                 .then(response => response.json() as Traveller)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}
