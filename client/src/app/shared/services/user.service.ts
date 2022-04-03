import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;

  constructor() {}

  setUser(user: User | null): void {
    this.user = user;
    console.log('setUser', this.user);
  }

  getUser(): User | null {
    return this.user;
  }
}
