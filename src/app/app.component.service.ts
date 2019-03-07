import { Injectable } from '@angular/core';

import { Traveller } from './travellers/traveller';

@Injectable()
export class UserDataService {
   user: Traveller;
   getUserData() {
      return this.user;
   }
   setUserData(data: Traveller) {
       this.user = data;
   }
}
