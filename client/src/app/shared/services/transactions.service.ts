import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../constants';
import { FormTransaction, Transaction } from '../models/transaction';
import { AccountsService } from './accounts.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public readonly transactions$ = this.transactionsSubject.asObservable();

  public filteredTransactions$ = this.transactionsSubject.asObservable();

  private selectedTransaction: Transaction | null = null;
  private filterSubject = new BehaviorSubject<'income' | 'expense' | ''>('');
  public filter$ = this.filterSubject.asObservable();

  constructor(
    private http: HttpClient,
    private accountsService: AccountsService,
    private userService: UserService
  ) {
    // this.filterSubject.subscribe((filter: 'income' | 'expense' | '') => {
    //   console.log(this.filteredTransactions);
    //   if (filter !== '')
    //     this.filteredTransactions = this.filterTransactions(filter);
    // });
  }

  public setFilter(filter: 'income' | 'expense' | ''): void {
    this.filterSubject.next(filter);
  }

  // public get filteredTransactions$() {
  //   // console.log(this.filteredTransactions);

  //   return this.filteredTransactions;
  // }

  public filterTransactions(filter: 'income' | 'expense'): Transaction[] {
    return this.getTransactions().filter((t) => t.type === filter);
  }

  public getFilteredTransactions(filter: 'income' | 'expense'): Transaction[] {
    return this.filterTransactions(filter);
  }

  public fetchTransactions(accountId: string): void {
    this.http
      .get<Transaction[]>(this.getUrlWithQueryParams(accountId))
      .subscribe((transactions: Transaction[]) => {
        this.transactionsSubject.next(transactions);
      });
  }

  public createTransaction(transaction: FormTransaction): void {
    this.http.post<Transaction>(this.getUrl(), transaction).subscribe({
      next: (transaction: Transaction) => {
        this.transactionsSubject.next([
          ...this.transactionsSubject.getValue(),
          transaction,
        ]);
      },
      complete: this.updateAccounts.bind(this),
    });
  }

  public updateTransaction(transaction: Transaction): void {
    this.http
      .put<Transaction>(this.getUrlWithId(transaction._id), transaction)
      .subscribe({
        next: (transaction: Transaction) => {
          this.transactionsSubject.next([
            ...this.transactionsSubject
              .getValue()
              .map((t) => (t._id === transaction._id ? transaction : t)),
          ]);
        },
        complete: this.updateAccounts.bind(this),
      });
  }

  public deleteTransaction(transaction: Transaction): void {
    this.http
      .delete<Transaction>(this.getUrlWithId(transaction._id))
      .subscribe({
        next: () => {
          this.transactionsSubject.next(
            this.transactionsSubject
              .getValue()
              .filter((t) => t._id !== transaction._id)
          );
        },
        complete: this.updateAccounts.bind(this),
      });
  }

  private updateAccounts(): void {
    this.accountsService.fetchAccounts(this.userService.getId());
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

  private getUrlWithId(id: string): string {
    return `${this.getUrl()}${id}`;
  }

  private getUrlWithQueryParams(accountId: string): string {
    return `${this.getUrl()}?accountId=${accountId}`;
  }
}
