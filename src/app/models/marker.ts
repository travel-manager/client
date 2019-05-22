import { Traveller } from 'app/models/traveller';

export class Marker {
  id?: number;
  tripId: number;
  lat: number;
  long: number;
  note: string;
  creator: string;
  type: string
}
