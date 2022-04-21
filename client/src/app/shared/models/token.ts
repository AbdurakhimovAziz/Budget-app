import { User } from './user';

export interface Token {
  token: string;
  expiresIn: string;
  user: User;
}
