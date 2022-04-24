import { Component, OnInit } from '@angular/core';
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
export class AccountFormComponent implements OnInit {
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl(
      this.formService.isEditing
        ? this.accountsService.getSelectedAccount()?.title
        : '',
      [Validators.required]
    ),
    currency: new FormControl(
      this.formService.isEditing
        ? this.accountsService.getSelectedAccount()?.currency._id
        : this.currecniesService.getDefaultCurrency()._id,
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
    public currecniesService: CurrenciesService,
    private panelService: PanelService
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.resetForm();
    this.panelService.close();
    this.panelService.clearPanelPortal();
  }

  public cancel(): void {
    this.panelService.clearPanelPortal();
    this.resetForm();
    this.panelService.setPanelContent(AccountViewComponent);
  }

  private resetForm(): void {
    this.accountForm.reset();
    this.formService.setEditing(false);
  }
}
