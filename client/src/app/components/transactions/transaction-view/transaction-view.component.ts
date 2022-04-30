import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from 'src/app/shared/models/transaction';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  public transaction!: Transaction;

  constructor(
    public transactionsService: TransactionsService,
    private panelService: PanelService,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar
  ) {}

  public get currencySymbol(): string {
    return this.transactionsService.getCurrency();
  }

  public ngOnInit(): void {
    const transaction = this.transactionsService.getSelectedTransaction();
    if (transaction) this.transaction = transaction;
  }

  public edit(): void {
    this.formService.setEditing(true);
    this.panelService.setPanelContent(TransactionFormComponent);
    this.panelService.open();
  }

  public close(): void {
    this.transactionsService.setSelectedTransaction(null);
    this.panelService.clearPanelPortal();
    this.panelService.close();
  }

  public delete(): void {
    this.transactionsService.deleteTransaction(this.transaction);
    this._snackBar.open('Transaction deleted', 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.close();
  }
}
