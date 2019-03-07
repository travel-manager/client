import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { TravellerCreateComponent } from './travellers/traveller-create/traveller-create.component';
import { TravellerLoginComponent } from './travellers/traveller-login/traveller-login.component';
import { TravellerLogoutComponent } from './travellers/traveller-logout/traveller-logout.component';
import { TripCreateComponent } from './trips/trip-create/trip-create.component';
import { UserDataService } from './app.component.service';
import { DatepickerComponent } from './trips/trip-create/datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    TravellerCreateComponent,
    TravellerLoginComponent,
    TravellerLogoutComponent,
    TripCreateComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

