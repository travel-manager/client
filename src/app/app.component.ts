import { Component } from '@angular/core';
import { UserDataService } from './app.component.service';
import { Traveller } from 'app/travellers/traveller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public _userData: UserDataService) { }
}
