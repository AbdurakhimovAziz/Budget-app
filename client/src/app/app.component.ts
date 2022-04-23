import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { customIcons } from './shared/custom-icons';
import { Account } from './shared/models/account';
import { AccountsService } from './shared/services/accounts.service';
import { CategoriesService } from './shared/services/categories.service';
import { TransactionsService } from './shared/services/transactions.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budgetify';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private user: UserService,
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private categoriesService: CategoriesService
  ) {
    customIcons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }

  public ngOnInit(): void {
    this.accountsService.currentAccount$.subscribe(
      (account: Account | null) => {
        if (account) this.transactionsService.fetchTransactions(account._id);
      }
    );
    this.accountsService.fetchAccounts(this.user.getId());
    this.categoriesService.fetchCategories();
  }
}
