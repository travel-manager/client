import { Traveller } from 'app/travellers/traveller';

export class Transaction {
  _id?: string;
  payer: string;
  freeloader: string;
  amount: number;
  subject: string;
  date: Date;
}
