import { Component } from '@angular/core';
import { ImageService } from './image.service';
import { TravellerService } from 'app/travellers/traveller.service';
import { TripService } from 'app/trips/trip.service';
import { Traveller } from 'app/models/traveller';
import { Trip } from 'app/models/trip';
import { UserDataService } from 'app/app.component.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.scss'],
  providers: [ImageService, TravellerService, TripService]
})
export class ImageUploadComponent {

  uploadsuccess = 0;
  selectedFile: ImageSnippet;

  constructor(
    private _userData: UserDataService,
    private imageService: ImageService,
    private travellerService: TravellerService,
    private tripService: TripService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      if ((this.selectedFile.file.type === 'image/jpeg' || this.selectedFile.file.type === 'image/png')
       && this.selectedFile.file.size < 200000) {
        this.imageService.uploadImage(this.selectedFile.file).then(
          (res) => {
            this.onSuccess();
            if (this._userData.getView() === 'myprofile') {
              const user: Traveller = this._userData.getUserData();
              if (user.picture !== 'profile-default') {
                this.imageService.deleteImage(user.picture);
              }
              user.picture = res['imageUrl'].replace('https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/', '');
              this.travellerService.updateTraveller(user);
            } else {
              const trip: Trip = this._userData.getTripData();
              if (trip.picture !== 'trip-default') {
                this.imageService.deleteImage(trip.picture);
              }
              trip.picture = res['imageUrl'].replace('https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/', '');
              this.tripService.updateTrip(trip);
            }
          },
          (err) => {
            this.onError();
          })
      } else {
        this.selectedFile.pending = false;
          this.uploadsuccess = -1;
          setTimeout(function() {
            this.uploadsuccess = 0;
            }.bind(this), 5000);
      }
    });

    reader.readAsDataURL(file);
  }
}
