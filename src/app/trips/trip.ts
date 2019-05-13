import { Traveller } from 'app/travellers/traveller';
import { Marker } from './trip-hub/marker';
import { Url } from 'url';


export class Trip {
  id: number;
  location: string;
  lat: number;
  long: number;
  picture: string;
  name: string;
  datestart: Date;
  dateend: Date;
  owner: string; //traveller TODO: menubalk aanpassen
  description: string;
  public: boolean;
}

