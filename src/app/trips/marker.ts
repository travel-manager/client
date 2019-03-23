import { Traveller } from 'app/travellers/traveller';

export class Marker {
  _id?: string;
  tripId: string;
  coords: { lat: Number, lng: Number };
  note: string;
  creator: string;
  type: string
}
