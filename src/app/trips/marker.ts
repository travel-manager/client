import { Traveller } from 'app/travellers/traveller';

export class Marker {
  _id?: string;
  coords: Array<number>;
  note: string;
  creator: Traveller;
  type: string
}
