import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { AccountFormComponent } from '../accounts/account-form/account-form.component';
import { CategoryFormComponent } from '../categories/category-form/category-form.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @ViewChild('incomeBtn', { static: false }) incomeBtn!: any;
  @ViewChild('expenseBtn', { static: false }) expenseBtn!: any;

  constructor(
    private formService: FormService,
    private panelService: PanelService,
    public routerService: RouterService,
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService
  ) {}

  public openAddForm(): void {
    this.formService.setEditing(false);
    this.panelService.setPanelContent(AccountFormComponent);
    this.panelService.open();
  }

  public openCategoryForm(): void {
    this.panelService.setPanelContent(CategoryFormComponent);
    this.panelService.open();
  }

  public openTransactionForm(): void {
    this.panelService.setPanelContent(TransactionFormComponent);
    this.panelService.open();
  }

  public setFilter(event: MouseEvent, filter: 'income' | 'expense' | ''): void {
    const class1 = this.incomeBtn._elementRef.nativeElement.classList;
    const class2 = this.expenseBtn._elementRef.nativeElement.classList;

    if (class1 === 'active') {
      class1.remove('active');
      class2.add('active');
    } else if (class2 === 'active') {
      class2.remove('active');
      class1.add('active');
    } else {
      class1.remove('active');
      class2.remove('active');
      this.transactionsService.setFilter('');
    }

    console.log(this.incomeBtn);

    if (this.routerService.isRoute('/')) {
      this.transactionsService.setFilter(filter);
    } else {
      this.categoriesService.setFilter(filter);
    }
  }
}
