import { Component, Input } from '@angular/core';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'app-accounts-item',
  templateUrl: './accounts-item.component.html',
  styleUrls: ['./accounts-item.component.scss'],
})
export class AccountsItemComponent {
  @Input() public account!: Account;

  public get currencySymbol(): string {
    return this.account.currency.toString().slice(-2, -1);
  }

  public get currencyName(): string {
    return this.account.currency.slice(0, -4).toUpperCase();
  }
  constructor() {}
}
