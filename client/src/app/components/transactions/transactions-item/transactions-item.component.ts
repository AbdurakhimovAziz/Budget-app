import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionViewComponent } from '../transaction-view/transaction-view.component';

@Component({
  selector: 'app-transactions-item',
  templateUrl: './transactions-item.component.html',
  styleUrls: ['./transactions-item.component.scss'],
})
export class TransactionsItemComponent {
  @Input() public transaction!: Transaction;

  constructor(
    private transactionsService: TransactionsService,
    private panelService: PanelService
  ) {}

  public get currencySymbol(): string {
    return this.transactionsService.getCurrency();
  }

  public viewTransaction(): void {
    this.transactionsService.setSelectedTransaction(this.transaction);
    this.panelService.setPanelContent(TransactionViewComponent);
    this.panelService.open();
  }
}
