import { Component } from '@angular/core';
import { ImageService } from './image.service';
import { TravellerService } from 'app/travellers/traveller.service';
import { TripService } from 'app/trips/trip.service';
import { Traveller } from 'app/travellers/traveller';
import { Trip } from 'app/trips/trip';
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
      this.imageService.uploadImage(this.selectedFile.file).then(
        (res) => {
          this.onSuccess();
          if (this._userData.getView() === 'myprofile') {
            const user: Traveller = this._userData.getUserData();
            this.imageService.deleteImage(user.picture);
            user.picture = res['imageUrl'].replace('https://travelmanagerpictures.s3.eu-north-1.amazonaws.com/', '');
            this.travellerService.updateTraveller(user);
          }
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }
}
