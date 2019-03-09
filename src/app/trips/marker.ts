import { Traveller } from 'app/travellers/traveller';

export class Marker {
  _id?: string;
  coords: { lat: Number, lng: Number };
  note: string;
  creator: Traveller;
  type: string
}
