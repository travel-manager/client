import { Traveller } from 'app/travellers/traveller';

export class Marker {
  id?: number;
  tripId: number;
  latitude: number;
  longitude: number;
  note: string;
  creator: string;
  type: string
}
