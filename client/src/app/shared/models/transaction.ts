import { Category } from './category';

export interface Transaction {
  _id: string;
  title: string;
  categories: Category[];
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  payee?: string;
  description?: string;
  account_id: string;
}

export interface FormTransaction {
  title: string;
  categories: Category[];
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  payee?: string;
  description?: string;
  account_id: string;
}
