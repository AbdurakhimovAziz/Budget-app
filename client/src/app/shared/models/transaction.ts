import { Category } from './category';

export interface Transaction {
  title: string;
  categories: Category[];
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  payee?: string;
  description?: string;
  account_id: string;
}
