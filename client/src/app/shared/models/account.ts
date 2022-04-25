import { AccountCurrency } from './account-currency';

export interface Account {
  _id: string;
  title: string;
  balance: number;
  currency: AccountCurrency;
  user_id: string;
  description?: string;
}

export interface AccountForm {
  title: string;
  currency: AccountCurrency;
  user_id: string;
  description?: string;
}
