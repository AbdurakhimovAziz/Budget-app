import { Component, HostBinding, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  @HostBinding('class') class = 'scroll';

  constructor(public transactionsService: TransactionsService) {}
}
