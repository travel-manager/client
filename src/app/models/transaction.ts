import { Traveller } from 'app/models/traveller';

export class Transaction {
  _id?: string;
  payer: string;
  freeloader: string;
  amount: number;
  unit: string;
  subject: string;
  timestamp: Date;
}
