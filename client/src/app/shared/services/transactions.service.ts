import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public readonly transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  public fetchTransactions(accountId: string): void {
    this.http
      .get<Transaction[]>(this.getUrlWithQueryParams(accountId))
      .subscribe((transactions: Transaction[]) => {
        console.log('transactions', transactions);

        this.transactionsSubject.next(transactions);
      });
  }

  public getTransactions(): Transaction[] {
    return this.transactionsSubject.getValue();
  }

  private getUrl(): string {
    return `${BASE_URL}/transactions/`;
  }

  private getUrlWithQueryParams(accountId: string): string {
    return `${this.getUrl()}?accountId=${accountId}`;
  }
}
