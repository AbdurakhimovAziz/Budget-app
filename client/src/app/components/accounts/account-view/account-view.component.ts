import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
})
export class AccountViewComponent implements OnInit {
  public account!: Account;

  constructor(
    public accountService: AccountsService,
    private panelService: PanelService
  ) {}

  public ngOnInit(): void {
    const account = this.accountService.getViewEditAccount();
    if (account) this.account = account;
  }

  public edit(): void {
    this.panelService.setPanelContent(AccountFormComponent);
    this.panelService.open();
  }

  public close(): void {
    this.panelService.clearPanelPortal();
    this.panelService.close();
  }
}
