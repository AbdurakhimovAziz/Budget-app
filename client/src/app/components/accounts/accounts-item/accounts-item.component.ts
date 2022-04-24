import { Component, Input } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { AccountViewComponent } from '../account-view/account-view.component';

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

  public onClick(): void {
    if (this.accountsService.getCurrentAccount() === this.account) return;
    this.accountsService.setCurrentAccount(this.account);
  }

  public viewAccount(account: Account): void {
    this.accountsService.setSelectedAccount(account);
    this.panelService.setPanelContent(AccountViewComponent);
    this.panelService.open();
  }

  constructor(
    private accountsService: AccountsService,
    public panelService: PanelService
  ) {}
}
