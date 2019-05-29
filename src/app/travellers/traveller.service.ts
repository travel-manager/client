import { Injectable } from '@angular/core';
import { Traveller } from '../models/traveller';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Login } from 'app/models/login';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://51.77.195.120:8090';
    if (!req.url.includes('googleapis') && !req.url.includes('/keys/') && !req.url.includes('/image-upload/')) {
      req = req.clone({
        url: url + req.url
      });
    }
    console.log(req);
    return next.handle(req);
  }
}

@Injectable()
export class TravellerService {
    private travellersUrl ='/travellers';
    private loginUrl ='/authentication';
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
    loginTraveller(loginTraveller: Login): Promise<Traveller> {
      return this.http.post(this.loginUrl + '/login' , loginTraveller )
                 .toPromise()
                 .then(response => response as Traveller)
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
