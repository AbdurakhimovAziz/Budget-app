import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from '../constants';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly accountsSubject = new BehaviorSubject<Account[]>([]);
  readonly accounts$ = this.accountsSubject.asObservable();

  private readonly currentAccountSubject: BehaviorSubject<Account | null> =
    new BehaviorSubject<Account | null>(null);
  public readonly currentAccount$: Observable<Account | null> =
    this.currentAccountSubject.asObservable();

  constructor(private http: HttpClient) {}

  public fetchAccounts(userId: string): void {
    this.http
      .get<Account[]>(this.getUrlWithQueryParams(userId))
      .subscribe((accounts: Account[]) => {
        this.accountsSubject.next(accounts);
        this.currentAccountSubject.next(accounts[0]);
      });
  }

  public getAccounts(): Account[] {
    return this.accountsSubject.getValue();
  }

  public getCurrentAccount(): Account | null {
    return this.currentAccountSubject.getValue();
  }

  public setCurrentAccount(account: Account | null): void {
    this.currentAccountSubject.next(account);
  }

  private getUrl(): string {
    return `${BASE_URL}/accounts/`;
  }

  private getUrlWithQueryParams(userId: string): string {
    return `${this.getUrl()}?userId=${userId}`;
  }
}
