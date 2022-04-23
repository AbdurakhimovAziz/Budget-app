import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { AccountsService } from 'src/app/shared/services/accounts.service';

@Component({
  selector: 'app-transactions-item',
  templateUrl: './transactions-item.component.html',
  styleUrls: ['./transactions-item.component.scss'],
})
export class TransactionsItemComponent {
  @Input() public transaction!: Transaction;

  constructor(private accountService: AccountsService) {}

  public get currencySymbol(): string {
    return this.accountService.getCurrentAccount()?.currency.symbol || '';
  }
}
