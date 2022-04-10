import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  public accounts: Account[] = [];
  constructor(
    private accountsService: AccountsService,
    private user: UserService
  ) {}

  public ngOnInit(): void {
    this.accountsService
      .getAll(this.user.getId())
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }
}
