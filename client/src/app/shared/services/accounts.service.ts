import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accounts: Account[] = [];
  constructor(private http: HttpClient) {}

  public getAll(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.getUrlWithQueryParams(userId));
  }

  private getUrl(): string {
    return `${BASE_URL}/accounts/`;
  }

  private getUrlWithQueryParams(userId: string): string {
    return `${this.getUrl()}?userId=${userId}`;
  }

  public getAccounts(): Account[] {
    return this.accounts;
  }
}
