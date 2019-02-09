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
  traveller: Traveller = {
    lastname: '',
    username: '',
    password: '',
    forename: '',
  };

  constructor (private travellerService: TravellerService) {}

  createTraveller(traveller: Traveller) {
    this.travellerService.createTraveller(traveller);
    traveller = {
      lastname: '',
      username: '',
      password: '',
      forename: '',
    };
    };
}
