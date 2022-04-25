export interface Category {
  _id: string;
  title: string;
  type: 'income' | 'expense';
  user_id: string;
}

export interface FormCategory {
  title: string;
  type: 'income' | 'expense';
  user_id: string;
}
