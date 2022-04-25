import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from '../constants';
import { Account, AccountForm } from '../models/account';

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

  private selectedAccount: Account | null = null;

  constructor(private http: HttpClient) {}

  public fetchAccounts(userId: string): void {
    this.http
      .get<Account[]>(this.getUrlWithQueryParams(userId))
      .subscribe((accounts: Account[]) => {
        this.accountsSubject.next(accounts);
        this.currentAccountSubject.next(accounts[0]);
      });
  }

  public addAccount(account: AccountForm) {
    this.http
      .post<Account>(this.getUrl(), account)
      .subscribe((account: Account) => {
        this.accountsSubject.next([
          ...this.accountsSubject.getValue(),
          account,
        ]);
      });
  }

  public updateAccount(account: Account) {
    this.http
      .put<Account>(this.getUrlWithId(account._id), account)
      .subscribe((account: Account) => {
        this.accountsSubject.next([
          ...this.getAccounts().map((acc) =>
            acc._id === account._id ? account : acc
          ),
        ]);
      });
  }

  public deleteAccount(account: Account): void {
    this.http
      .delete<Account>(this.getUrlWithId(account._id))
      .subscribe((account: Account) => {
        this.accountsSubject.next(
          this.accountsSubject
            .getValue()
            .filter((acc) => acc._id !== account._id)
        );
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

  public setSelectedAccount(account: Account | null): void {
    this.selectedAccount = account;
  }

  public getSelectedAccount(): Account | null {
    return this.selectedAccount;
  }

  private getUrl(): string {
    return `${BASE_URL}/accounts/`;
  }

  private getUrlWithId(id: string): string {
    return `${this.getUrl()}${id}`;
  }

  private getUrlWithQueryParams(userId: string): string {
    return `${this.getUrl()}?userId=${userId}`;
  }
}
