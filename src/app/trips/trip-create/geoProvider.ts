import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class GeoProvider {
  apiUrl1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  apiUrl2 = '&key=AIzaSyBpmZbeEIAX5zzNxAei4LpwHGjqDiAqpbk';

  constructor(public http: HttpClient) {
  }

  getCoords(location) {

    let apiUrl = this.apiUrl1+location+this.apiUrl2;
    return new Promise(resolve => {
      this.http.get(apiUrl).subscribe((data: any)  => {
        let result = data.results[0].geometry.location;
        resolve(result);
      }, err => {
        console.log(err);
      });
    });
  }
}
