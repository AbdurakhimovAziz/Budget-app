import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subject, switchMap, takeUntil } from 'rxjs';
import { Account } from 'src/app/shared/models/account';
import { Transaction } from 'src/app/shared/models/transaction';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private currentAccount!: Account | null;
  public transactions: Transaction[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {}

  public ngOnInit(): void {
    this.accountsService.currentAccount$
      .pipe(
        switchMap((account: Account | null) => {
          this.currentAccount = account;
          return account
            ? this.transactionsService.getAll(account?._id)
            : EMPTY;
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
