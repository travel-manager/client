import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TravellerCreateComponent } from './travellers/traveller-create/traveller-create.component';
import { TravellerLoginComponent } from './travellers/traveller-login/traveller-login.component';
import { TravellerLogoutComponent } from './travellers/traveller-logout/traveller-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    TravellerCreateComponent,
    TravellerLoginComponent,
    TravellerLogoutComponent
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
