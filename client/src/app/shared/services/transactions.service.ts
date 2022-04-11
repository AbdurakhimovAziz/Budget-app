import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  public getAll(accountId: string): Observable<Transaction> {
    return this.http.get<Transaction>(this.getUrlWithQueryParams(accountId));
  }

  private getUrl(): string {
    return `${BASE_URL}/accounts/`;
  }

  private getUrlWithQueryParams(accountId: string): string {
    return `${this.getUrl()}?accountId=${accountId}`;
  }
}
