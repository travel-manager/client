import { Traveller } from 'app/travellers/traveller';
import { Marker } from './trip-hub/marker';
import { Url } from 'url';


export class Trip {
  id?: number;
  location: string;
  latitude: number;
  longitude: number;
  picture: string;
  name: string;
  datestart: Date;
  dateend: Date;
  owner: string;
  description: string;
  isPublic: boolean;
}

