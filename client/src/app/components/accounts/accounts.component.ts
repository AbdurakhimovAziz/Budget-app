import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Account } from 'src/app/shared/models/account';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  public accounts: Account[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private accountsService: AccountsService,
    private user: UserService
  ) {}

  public ngOnInit(): void {
    this.accountsService
      .getAll(this.user.getId())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
