import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Key } from 'app/key';

@Injectable()
export class GeoProvider {
  apiUrl1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  apiUrl2 = '&key=';


  constructor(public http: HttpClient) {
  }

  getCoords(location) {

    let apiKey: string;
    return this.getGKey().then (key => {
      apiKey = key.value;
      const apiUrl = this.apiUrl1 + location + this.apiUrl2 + apiKey;
      return new Promise(resolve => {
        this.http.get(apiUrl).subscribe((data: any)  => {
          let result = data.results[0].geometry.location;
          resolve(result);
        }, err => {
          console.log(err);
        });
      });
    });
  }
  getGKey(): Promise<Key> {
    return this.http.get('/api/keys/GKey')
               .toPromise()
               .then(response => response as Key)
  }
}
