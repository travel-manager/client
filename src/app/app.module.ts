import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TravellerDetailsComponent } from './travellers/traveller-details/traveller-details.component';
import { TravellerListComponent } from './travellers/traveller-list/traveller-list.component';
import { TravellerCreateComponent } from './travellers/traveller-create/traveller-create.component';

@NgModule({
  declarations: [
    AppComponent,
    TravellerDetailsComponent,
    TravellerListComponent,
    TravellerCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
