import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  constructor(
    public accountsService: AccountsService,
    private user: UserService
  ) {}

  public ngOnInit(): void {
    this.accountsService.fetchAccounts(this.user.getId());
  }
}
