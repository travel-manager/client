import { Component, OnInit, Input } from '@angular/core';
import { Traveller } from '../traveller';
import { UserDataService } from 'app/app.component.service';
import { Countries } from '../countries'

@Component({
  selector: 'app-traveller-profile',
  templateUrl: './traveller-profile.component.html',
  styleUrls: ['./traveller-profile.component.css']
})
export class TravellerProfileComponent implements OnInit {
  @Input()
  transferLeadership: Function;
  @Input()
  traveller: Traveller;
  @Input()
  userIsOwner: boolean;
  private countries: Countries = new Countries;

  constructor() { }

  ngOnInit() {
  }

  codeToCountry(countryCode: string): string {
    countryCode = countryCode.toUpperCase();
    if (this.countries.isoCountries.hasOwnProperty(countryCode)) {
      return this.countries.isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }

  changeLeader(newLeader: string) {
    this.transferLeadership(newLeader);
  }
}
