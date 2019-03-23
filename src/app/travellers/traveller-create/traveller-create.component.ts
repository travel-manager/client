import { Component, OnInit } from '@angular/core';
import { Traveller } from '../traveller';
import { TravellerService } from '../traveller.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-traveller-create',
  templateUrl: './traveller-create.component.html',
  styleUrls: ['./traveller-create.component.css'],
  providers: [TravellerService]
})

export class TravellerCreateComponent implements OnInit {
  public createsuccess = 0;
  traveller: Traveller = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    picture: null
  };

  constructor (private travellerService: TravellerService) {}

  ngOnInit() {
  }

  createTraveller(traveller: Traveller) {
    this.travellerService.getTravellerByUsername(traveller.username).then((dbreturn: Traveller) => {
      if (dbreturn == null) {
        const bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(10);
        traveller.password = bcrypt.hashSync(traveller.password, salt);
        this.traveller.picture = '1553354500042';
        this.travellerService.createTraveller(traveller);
        this.createsuccess = 1;
        this.traveller = {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          picture: null
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
