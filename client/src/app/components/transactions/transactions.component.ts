import { Component, HostBinding, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  public filteredTransactions: Transaction[] = [];
  @HostBinding('class') class = 'scroll';

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.filteredTransactions$.subscribe((transactions) => {
      this.filteredTransactions = [...transactions];
    });

    this.transactionsService.filter$.subscribe((filter) => {
      if (filter !== '')
        this.filteredTransactions =
          this.transactionsService.filterTransactions(filter);
      else
        this.filteredTransactions = [
          ...this.transactionsService.getTransactions(),
        ];
    });
  }
}
