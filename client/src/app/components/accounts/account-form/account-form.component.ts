import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { AccountViewComponent } from '../account-view/account-view.component';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent {
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl(
      this.formService.isEditing
        ? this.accountsService.getSelectedAccount()?.title
        : '',
      [Validators.required]
    ),
    currency: new FormControl(
      this.formService.isEditing
        ? this.accountsService.getSelectedAccount()?.currency.cc
        : this.currenciesService.getDefaultCurrency().cc,
      [Validators.required]
    ),
    description: new FormControl(
      this.formService.isEditing
        ? this.accountsService.getSelectedAccount()?.description
        : ''
    ),
  });

  constructor(
    private accountsService: AccountsService,
    private formService: FormService,
    public currenciesService: CurrenciesService,
    private panelService: PanelService
  ) {}

  public close(): void {
    this.resetForm();
    this.panelService.close();
    this.formService.setEditing(false);
  }

  public cancel(): void {
    this.resetForm();

    if (this.formService.isEditing)
      this.panelService.setPanelContent(AccountViewComponent);
    else this.close();
  }

  private resetForm(): void {
    this.accountForm.reset();
    this.panelService.clearPanelPortal();
  }
}
