import { Traveller } from 'app/travellers/traveller';
import { Marker } from './marker';
import { Url } from 'url';


export class Trip {
  _id?: string;
  location: string;
  coords: Array<number>;
  picture: string;
  name: string;
  datestart: Date;
  dateend: Date;
  members: Array<Traveller>;
  markers: Array<Marker>;
  owner: Traveller;
  description: string;
}

