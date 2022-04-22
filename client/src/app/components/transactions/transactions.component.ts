import { Component, HostBinding, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @HostBinding('class') class = 'scroll';

  constructor(
    public transactionsService: TransactionsService,
    private accountsService: AccountsService
  ) {}

  public ngOnInit(): void {
    this.accountsService.currentAccount$.subscribe(
      (account: Account | null) => {
        if (account) this.transactionsService.fetchTransactions(account._id);
      }
    );
  }
}
