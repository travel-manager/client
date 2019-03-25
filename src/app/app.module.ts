import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import {MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { TravellerCreateComponent } from './travellers/traveller-create/traveller-create.component';
import { TravellerLoginComponent } from './travellers/traveller-login/traveller-login.component';
import { TripCreateComponent } from './trips/trip-create/trip-create.component';
import { UserDataService } from './app.component.service';
import { DatepickerComponent } from './trips/trip-create/datepicker.component';
import { HttpClientModule } from '@angular/common/http';
import { TripHubComponent } from './trips/trip-hub/trip-hub.component';
import { PublicTripsComponent } from './trips/public-trips/public-trips.component';
import { MyTripsComponent } from './trips/my-trips/my-trips.component';
import {  MemberSidebarComponent  } from './trips/member-sidebar/member-sidebar.component';
import { CreateTransactionComponent } from './trips/transactions/create-transaction/create-transaction.component';
import { TripChatComponent } from './trips/trip-hub/trip-chat/trip-chat.component';
import { TripOptionsComponent } from './trips/trip-hub/trip-options/trip-options.component';
import { ImageUploadComponent } from './other/image-upload/image-upload.component';
import { ProfileOptionsComponent } from './travellers/profile-options/profile-options.component';
import { USE_VALUE } from '@angular/core/src/di/injector';
import { TripFeedComponent } from './trips/trip-hub/trip-feed/trip-feed.component';
@NgModule({
  declarations: [
    AppComponent,
    TravellerCreateComponent,
    TravellerLoginComponent,
    TripCreateComponent,
    DatepickerComponent,
    TripHubComponent,
    PublicTripsComponent,
    MyTripsComponent,
    MemberSidebarComponent,
    CreateTransactionComponent,
    TripChatComponent,
    TripOptionsComponent,
    ImageUploadComponent,
    ProfileOptionsComponent,
    TripFeedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    NgbModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    OrderModule
  ],
  providers: [UserDataService, DatePipe,
     {provide: MAT_DATE_LOCALE, useValue: 'en-FI' },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

