import { Traveller } from 'app/models/traveller';
import { Marker } from './marker';
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

