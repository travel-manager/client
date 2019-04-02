import { Traveller } from 'app/travellers/traveller';

export class Marker {
  _id?: string;
  tripId: string;
  lat: number;
  long: number;
  note: string;
  creator: string;
  type: string
}
