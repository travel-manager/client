import { Injectable } from '@angular/core';
import { Traveller } from '../models/traveller';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://51.77.195.120';
    req = req.clone({
      url: url + req.url
    });
    req.headers.append
    console.log(req);
    return next.handle(req);
  }
}

@Injectable()
export class TravellerService {
    private travellersUrl = '/travellers';
    private usernameUrl = '/username';
    private idUrl = '/id';

    //private travellersUrl = '/api/travellers';

    constructor (private http: HttpClient) { }

    // get("/api/travellers")
    getTravellers(): Promise<Traveller[]> {
      return this.http.get(this.travellersUrl)
                 .toPromise()
                 .then(response => response as Traveller[])
                 .catch(this.handleError);
    }


    // post("/api/travellers")
    createTraveller(newTraveller: Traveller): Promise<Traveller> {
      return this.http.post(this.travellersUrl + '/register', newTraveller)
                 .toPromise()
                 .then(response => response as Traveller)
                 .catch(this.handleError);
    }

    // get("/api/travellers/username/:username")
    getTravellerByUsername(getTravellerUsername: String): Promise<Traveller> {
      return this.http.get(this.travellersUrl + this.usernameUrl + '/' + getTravellerUsername)
                 .toPromise()
                 .then(response => response as Traveller[])
                 .catch(this.handleError);
    }

    getTravellerById(getTravellerId: number): Promise<Traveller> {
      return this.http.get(this.travellersUrl + this.idUrl + '/' + getTravellerId)
                 .toPromise()
                 .then(response => response as Traveller[])
                 .catch(this.handleError);
    }

    // delete("/api/travellers/:id")
    deleteTraveller(delTravellerId: number): Promise<String> {
      return this.http.delete(this.travellersUrl + '/' + delTravellerId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    // put("/api/travellers/:id")
    updateTraveller(putTraveller: Traveller): Promise<Traveller> {
      const putUrl = this.travellersUrl + '/' + putTraveller.id;
      return this.http.put(putUrl, putTraveller)
                 .toPromise()
                 .then(response => response as Traveller)
                 .catch(this.handleError);
    }

    private handleError (error: any): Promise<any> {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
}
