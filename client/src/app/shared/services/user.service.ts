import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor() {}

  public setUser(user: User | null): void {
    this.user = user;
  }

  public getUser(): User | null {
    return this.user;
  }
}
