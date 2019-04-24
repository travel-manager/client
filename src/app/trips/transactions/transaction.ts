import { Traveller } from 'app/travellers/traveller';

export class Transaction {
  _id?: number;
  payer: string;
  freeloader: string;
  amount: number;
  unit: string;
  subject: string;
  timestamp: Date;
  tripId: number;
}
