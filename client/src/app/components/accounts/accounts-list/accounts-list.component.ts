import { Component, Input } from '@angular/core';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent {
  @Input() public accounts: Account[] = [];
  constructor() {}
}
