import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {

  constructor(private http: Http) {}


  public uploadImage(image: File): Promise<String> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/image-upload', formData).toPromise()
    .then(response => response.json() as String)
  }

  public deleteImage(key: string): Promise<String> {
    return this.http.delete('/api/image-upload/' + key).toPromise()
    .then(response => response.json() as String)
  }
}
