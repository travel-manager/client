import { Component, OnInit } from '@angular/core';
import { Traveller } from '../traveller';
import { TravellerService } from '../traveller.service';
import { TravellerDetailsComponent } from '../traveller-details/traveller-details.component';
import { TravellerCreateComponent } from '../traveller-create/traveller-create.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'traveller-list',
  templateUrl: './traveller-list.component.html',
  styleUrls: ['./traveller-list.component.css'],
  providers: [TravellerService]
})

export class TravellerListComponent implements OnInit {

  travellers: Traveller[]
  selectedTraveller: Traveller

  constructor(private travellerService: TravellerService) { }

  ngOnInit() {
     this.travellerService
      .getTravellers()
      .then((travellers: Traveller[]) => {
        this.travellers = travellers.map((traveller) => {
          return traveller;
        });
      });
  }

  private getIndexOfTraveller = (travellerId: String) => {
    return this.travellers.findIndex((traveller) => {
      return traveller._id === travellerId;
    });
  }

  selectTraveller(traveller: Traveller) {
    this.selectedTraveller = traveller
  }

  createNewTraveller() {

    const traveller: Traveller = {
      lastname: '',
      username: '',
      password: '',
      forename: '',
    };

    // By default, a newly-created traveller will have the selected state.
    this.selectTraveller(traveller);
  }

  deleteTraveller = (travellerId: String) => {
    const idx = this.getIndexOfTraveller(travellerId);
    if (idx !== -1) {
      this.travellers.splice(idx, 1);
      this.selectTraveller(null);
    }
    return this.travellers;
  }

  addTraveller = (traveller: Traveller) => {
    this.travellers.push(traveller);
    this.selectTraveller(traveller);
    return this.travellers;
  }

  updateTraveller = (traveller: Traveller) => {
    const idx = this.getIndexOfTraveller(traveller._id);
    if (idx !== -1) {
      this.travellers[idx] = traveller;
      this.selectTraveller(traveller);
    }
    return this.travellers;
  }
}
