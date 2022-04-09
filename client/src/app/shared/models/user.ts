export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  password: string;
  country: string;
  role: 'admin' | 'user';
  gender: 'male' | 'female';
}
