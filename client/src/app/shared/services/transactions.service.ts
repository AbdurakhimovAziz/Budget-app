import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../constants';
import { Transaction } from '../models/transaction';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public readonly transactions$ = this.transactionsSubject.asObservable();

  private selectedTransaction: Transaction | null = null;

  constructor(
    private http: HttpClient,
    private accountsService: AccountsService
  ) {}

  public fetchTransactions(accountId: string): void {
    this.http
      .get<Transaction[]>(this.getUrlWithQueryParams(accountId))
      .subscribe((transactions: Transaction[]) => {
        this.transactionsSubject.next(transactions);
      });
  }

  public getTransactions(): Transaction[] {
    return this.transactionsSubject.getValue();
  }

  public getSelectedTransaction(): Transaction | null {
    return this.selectedTransaction;
  }

  public setSelectedTransaction(transaction: Transaction | null): void {
    this.selectedTransaction = transaction;
  }

  public getCurrency(): string {
    return this.accountsService.getCurrentAccount()?.currency.symbol || '';
  }

  private getUrl(): string {
    return `${BASE_URL}/transactions/`;
  }

  private getUrlWithQueryParams(accountId: string): string {
    return `${this.getUrl()}?accountId=${accountId}`;
  }
}
