import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  @Input() public transactions: Transaction[] = [];

  constructor() {}
}
