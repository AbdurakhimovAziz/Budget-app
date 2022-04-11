import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from '../constants';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private currentAccountSubject: BehaviorSubject<Account | null>;
  public currentAccount$!: Observable<Account | null>;

  constructor(private http: HttpClient) {
    this.currentAccountSubject = new BehaviorSubject<Account | null>(null);
    this.currentAccount$ = this.currentAccountSubject.asObservable();
  }

  public getAll(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.getUrlWithQueryParams(userId)).pipe(
      tap((accounts) => {
        this.currentAccountSubject.next(accounts[0]);
      })
    );
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
