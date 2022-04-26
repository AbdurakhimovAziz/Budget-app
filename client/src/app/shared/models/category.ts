export interface Category {
  _id: string;
  title: string;
  type: 'income' | 'expense';
  user_id: string;
  numberOfTransactions?: number;
}

export interface FormCategory {
  title: string;
  type: 'income' | 'expense';
  user_id: string;
}
