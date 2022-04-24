import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { PanelService } from 'src/app/shared/services/panel.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  public transaction!: Transaction;

  constructor(
    public transactionsService: TransactionsService,
    private panelService: PanelService
  ) {}

  public get currencySymbol(): string {
    return this.transactionsService.getCurrency();
  }

  public ngOnInit(): void {
    const transaction = this.transactionsService.getSelectedTransaction();
    if (transaction) this.transaction = transaction;
  }

  public edit(): void {
    // this.panelService.setPanelContent(AccountFormComponent);
    // this.panelService.open();
  }

  public close(): void {
    this.panelService.clearPanelPortal();
    this.panelService.close();
  }
}
