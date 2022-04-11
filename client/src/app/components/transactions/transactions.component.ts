import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { Transaction } from 'src/app/shared/models/transaction';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  private currentAccount!: Account | null;

  public transactions: Transaction[] = [];
  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountsService.currentAccount$.subscribe((account) => {
      this.currentAccount = account;
      account &&
        this.transactionsService
          .getAll(account._id)
          .subscribe((transactions) => {
            this.transactions = transactions;
          });
    });
  }
}
