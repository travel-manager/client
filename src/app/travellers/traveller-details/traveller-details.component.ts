import { Component, Input } from '@angular/core';
import { Traveller } from '../traveller';
import { TravellerService } from '../traveller.service';
import { componentFactoryName } from '@angular/compiler';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.css']
})

export class TravellerDetailsComponent {
  @Input()
  traveller: Traveller;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private travellerService: TravellerService) {}

  createTraveller(traveller: Traveller) {
    this.travellerService.createTraveller(traveller).then((newTraveller: Traveller) => {
      this.createHandler(newTraveller);
    });
  }

  updateTraveller(traveller: Traveller): void {
    this.travellerService.updateTraveller(traveller).then((updatedTraveller: Traveller) => {
      this.updateHandler(updatedTraveller);
    });
  }

  deleteTraveller(travellerId: String): void {
    this.travellerService.deleteTraveller(travellerId).then((deletedTravellerId: String) => {
      this.deleteHandler(deletedTravellerId);
    });
  }
}
