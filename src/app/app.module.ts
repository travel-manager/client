import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { TravellerCreateComponent } from './travellers/traveller-create/traveller-create.component';
import { TravellerLoginComponent } from './travellers/traveller-login/traveller-login.component';
import { TripCreateComponent } from './trips/trip-create/trip-create.component';
import { UserDataService } from './app.component.service';
import { DatepickerComponent } from './trips/trip-create/datepicker.component';
import { HttpClientModule } from '@angular/common/http';
import { TripHubComponent } from './trips/trip-hub/trip-hub.component';
import { PublicTripsComponent } from './trips/public-trips/public-trips.component';

@NgModule({
  declarations: [
    AppComponent,
    TravellerCreateComponent,
    TravellerLoginComponent,
    TripCreateComponent,
    DatepickerComponent,
    TripHubComponent,
    PublicTripsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

