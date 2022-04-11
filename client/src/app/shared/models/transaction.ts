export interface Transaction {
  title: string;
  categories: string[];
  amount: number;
  date: Date;
  payee?: string;
  description?: string;
  account_id: string;
}
