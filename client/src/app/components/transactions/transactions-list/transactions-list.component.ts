import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = [];

  constructor() {}
}
