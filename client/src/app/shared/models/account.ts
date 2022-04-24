import { AccountCurrency } from './account-currency';
import { Currency } from './currency';

export interface Account {
  _id: string;
  title: string;
  balance: number;
  currency: AccountCurrency;
  user_id: string;
  description?: string;
}
