import { Currency } from './currency';

export interface Account {
  _id: string;
  title: string;
  balance: number;
  currency: Currency;
  user_id: string;
}
