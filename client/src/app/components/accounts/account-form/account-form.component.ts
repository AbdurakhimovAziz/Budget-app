import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { UserService } from 'src/app/shared/services/user.service';
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
    private panelService: PanelService,
    private userService: UserService
  ) {}

  public close(): void {
    this.resetForm();
    this.panelService.close();
    this.formService.setEditing(false);
  }

  public cancel(): void {
    this.resetForm();
    this.returnToView();
  }

  private returnToView(): void {
    if (this.formService.isEditing)
      this.panelService.setPanelContent(AccountViewComponent);
    else this.close();
  }

  private resetForm(): void {
    this.accountForm.reset();
    this.panelService.clearPanelPortal();
  }

  public saveAccount(): void {
    if (this.accountForm.valid) {
      const account = {
        title: this.accountForm.value.title,
        currency: this.currenciesService.getAccCurrencyByCode(
          this.accountForm.value.currency
        ),
        user_id: this.userService.getId(),
        description: this.accountForm.value.description,
      };

      if (this.formService.isEditing) {
        const editedAccount: Account = {
          ...account,
          _id: this.accountsService.getSelectedAccount()?._id!,
          balance: this.accountsService.getSelectedAccount()?.balance!,
        };
        this.accountsService.updateAccount(editedAccount);
      } else {
        this.accountsService.addAccount(account);
      }

      this.returnToView();

      /*
      TODO: if account currency is changed show modal
      with confirmation to change all accounts with the same currency
      if(condition above) {
        this.modalService.setTitle('Change currency');
        this.modalService.setContent(
          'Are you sure you want to change currency of all accounts with the same currency?'
        );
        this.modalService.open();
      }
      */
    }
  }
}
