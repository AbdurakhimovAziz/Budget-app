import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9\\s]+'),
        Validators.maxLength(128),
      ]
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
        : '',
      [Validators.maxLength(256)]
    ),
  });

  constructor(
    private accountsService: AccountsService,
    public formService: FormService,
    public currenciesService: CurrenciesService,
    private panelService: PanelService,
    private userService: UserService,
    private _snackBar: MatSnackBar
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
        this.accountsService.setSelectedAccount(editedAccount);
        this._snackBar.open('Account succesfully edited', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.accountsService.addAccount(account);
        this._snackBar.open('Account succesfully created', 'x', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      this.returnToView();
    }
  }
}
