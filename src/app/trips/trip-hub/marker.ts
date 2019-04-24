import { Traveller } from 'app/travellers/traveller';

export class Marker {
  _id?: number;
  tripId: number;
  lat: number;
  long: number;
  note: string;
  creator: string;
  type: string
}
