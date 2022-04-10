import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user$!: Observable<User | null>;

  constructor() {
    this.userSubject = new BehaviorSubject<User | null>(this.getUser());
    this.user$ = this.userSubject.asObservable();
  }

  public setUser(user: User | null): void {
    console.log('setUser', user);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public getId(): string {
    const user = this.getUser();
    return user ? user._id : '';
  }
}
