import { Traveller } from 'app/travellers/traveller';
import { Marker } from './trip-hub/marker';
import { Url } from 'url';


export class Trip {
  _id?: string;
  location: string;
  lat: number;
  long: number;
  picture: string;
  name: string;
  datestart: Date;
  dateend: Date;
  owner: string;
  description: string;
  status: string;
}

