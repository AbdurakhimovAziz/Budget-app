import { Component, Input } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';

@Component({
  selector: 'app-accounts-item',
  templateUrl: './accounts-item.component.html',
  styleUrls: ['./accounts-item.component.scss'],
})
export class AccountsItemComponent {
  @Input() public account!: Account;

  public get isCurrentAccount(): boolean {
    return this.accountsService.getCurrentAccount() === this.account;
  }

  public get currencySymbol(): string {
    return this.account.currency.toString().slice(-2, -1);
  }

  public get currencyName(): string {
    return this.account.currency.slice(0, -4).toUpperCase();
  }

  public onClick(): void {
    this.accountsService.setCurrentAccount(this.account);
  }

  constructor(private accountsService: AccountsService) {}
}
