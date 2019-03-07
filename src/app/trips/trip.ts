import { Traveller } from 'app/travellers/traveller';

export class Trip {
  _id?: string;
  location: string;
  coords: Array<number>;
  name: string;
  datestart: string;
  dateend: string;
  members: Array<Traveller>;
  owner: Traveller;
  description: string;
}

