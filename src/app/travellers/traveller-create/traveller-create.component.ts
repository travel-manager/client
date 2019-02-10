import { Component, Input } from '@angular/core';
import { Traveller } from '../traveller';
import { TravellerService } from '../traveller.service';
import { componentFactoryName } from '@angular/compiler';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'traveller-create',
  templateUrl: './traveller-create.component.html',
  styleUrls: ['./traveller-create.component.css'],
  providers: [TravellerService]
})

export class TravellerCreateComponent {

  public createsuccess = 0;
  traveller: Traveller = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };

  constructor (private travellerService: TravellerService) {}

  createTraveller(traveller: Traveller) {
    this.travellerService.getTraveller(traveller.username).then((dbreturn: Traveller) => {
      if (dbreturn == null) {
        this.travellerService.createTraveller(traveller);
        this.createsuccess = 1;
        this.traveller = {
          firstname: '',
          lastname: '',
          username: '',
          password: ''
        };
      } else {
        this.traveller.username = '';
        this.createsuccess = -1;
      }
    });
    setTimeout(function() {
      this.createsuccess = false;
      }.bind(this), 3000);
  }
}
