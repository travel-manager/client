import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Key } from 'app/key';

@Injectable()
export class GeoProvider {

  constructor(public http: HttpClient) {
  }

  getCoords(location) {

    let apiKey: string;
    return this.getGKey().then (key => {
      apiKey = key.value;
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKey;
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

  getAddress(lat: number, long: number){

    let apiKey: string;
    return this.getGKey().then (key => {
      apiKey = key.value;
      const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + apiKey;
      return new Promise(resolve => {
        let city;
        let country;
        this.http.get(apiUrl).subscribe((data: any)  => {
          loop:
          for (let i = 0; i < data.results[0].address_components.length; i++) {

            for (let b = 0; b < data.results[0].address_components[i].types.length; b++) {
                if (data.results[0].address_components[i].types[b] === 'postal_town'
                 || data.results[0].address_components[i].types[b] === 'locality'
                 || data.results[0].address_components[i].types[b] === 'administrative_area_level_1'
                 || data.results[0].address_components[i].types[b] === 'administrative_area_level_2'
                 || data.results[0].address_components[i].types[b] === 'administrative_area_level_3') {
                    city = data.results[0].address_components[i].long_name;
                    break loop;
                }
            }
          }
          loop:
          for (let i = 0; i < data.results[0].address_components.length; i++) {
            for (let b = 0; b < data.results[0].address_components[i].types.length; b++) {
                if (data.results[0].address_components[i].types[b] === 'country') {
                    country = data.results[0].address_components[i].long_name;
                    break loop;
                }
            }
          }
          const result = { 'city': city, 'country' : country };
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
