import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { FormService } from 'src/app/shared/services/form.service';
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
    public accountsService: AccountsService,
    private panelService: PanelService,
    private formService: FormService
  ) {}

  public ngOnInit(): void {
    const account = this.accountsService.getSelectedAccount();
    if (account) this.account = account;
  }

  public edit(): void {
    this.panelService.setPanelContent(AccountFormComponent);
    this.formService.setEditing(true);
  }

  public close(): void {
    this.panelService.clearPanelPortal();
    this.panelService.close();
  }

  public deleteAccount(): void {
    this.accountsService.deleteAccount(this.account);
    this.panelService.clearPanelPortal();
    this.panelService.close();
  }
}
