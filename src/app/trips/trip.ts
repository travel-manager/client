import { Traveller } from 'app/travellers/traveller';

export class Trip {
  _id?: string;
  location: string;
  name: string;
  datestart: Date;
  dateend: Date;
  members: Traveller[];
  owner: Traveller;
  description: string;
}

