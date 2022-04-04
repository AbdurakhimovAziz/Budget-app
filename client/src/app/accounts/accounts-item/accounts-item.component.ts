import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-item',
  templateUrl: './accounts-item.component.html',
  styleUrls: ['./accounts-item.component.scss'],
})
export class AccountsItemComponent {
  title = 'Debit Card';
  balance = '1000.5';
  constructor() {}
}
