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

  public getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.getUrl());
  }

  private getUrl(): string {
    return `${BASE_URL}/accounts`;
  }

  public getAccounts(): Account[] {
    return this.accounts;
  }
}
