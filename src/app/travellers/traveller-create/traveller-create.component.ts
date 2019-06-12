import { Component, OnInit } from '@angular/core';
import { Traveller } from '../../models/traveller';
import { TravellerService } from '../traveller.service';
import { HateoasResponse } from 'app/models/hateoasresponse';

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
    picture: null,
    bio: '',
    country: ''
  };

  constructor (private travellerService: TravellerService) {}

  ngOnInit() {
  }

  createTraveller(traveller: Traveller) {
    this.travellerService.createTraveller(traveller).then((result: HateoasResponse) => {
      console.log(result.content);
      if(result.content){
        this.createsuccess = 1;
      }else{
        this.createsuccess = -2;
      }
      /*
     if (dbreturn == null) {
        const bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(10);
        traveller.password = bcrypt.hashSync(traveller.password, salt);
        this.traveller.picture = 'profile-default';
        this.traveller.country = 'hidden';
        this.traveller.bio = 'I\'m using TravelManager!';
        this.travellerService.createTraveller(traveller);
        this.createsuccess = 1;
        this.traveller = {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          picture: null,
          bio: '',
          country: ''
        };
      } else {
        this.traveller.username = '';
        this.createsuccess = -1;
      }*/
    });
    setTimeout(function() {
      this.createsuccess = false;
      }.bind(this), 3000);
  }
}
