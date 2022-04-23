import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';

@Component({
  selector: 'app-transactions-item',
  templateUrl: './transactions-item.component.html',
  styleUrls: ['./transactions-item.component.scss'],
})
export class TransactionsItemComponent {
  @Input() public transaction!: Transaction;

  constructor() {}
}
