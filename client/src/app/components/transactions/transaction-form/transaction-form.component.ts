import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CurrenciesService } from 'src/app/shared/services/currencies.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionViewComponent } from '../transaction-view/transaction-view.component';
import { Category } from 'src/app/shared/models/category';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  FormTransaction,
  Transaction,
} from 'src/app/shared/models/transaction';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  public selectedTransaction =
    this.transactionsService.getSelectedTransaction();

  public categories = this.categoriesService.getCategories();
  public selectedCategories = [...(this.selectedTransaction?.categories || [])];
  public filteredCategories: Category[] = [];

  public addOnBlur: boolean = false;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.title : '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9\\s]+'),
        Validators.maxLength(128),
      ]
    ),
    type: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.type : 'income',
      [Validators.required]
    ),
    amount: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.amount : '',
      [Validators.required, Validators.min(0)]
    ),
    date: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.date : new Date(),
      [Validators.required]
    ),
    payee: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.payee : '',
      [Validators.pattern('[a-zA-Z0-9\\s]+')]
    ),
    description: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.description : '',
      [Validators.maxLength(256)]
    ),
  });

  constructor(
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
    public formService: FormService,
    public currenciesService: CurrenciesService,
    private panelService: PanelService,
    public categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.filterCategories();
  }

  public submit(): void {
    if (this.transactionForm.valid && this.selectedCategories.length) {
      const transaction: Transaction = this.transactionForm.value;
      transaction.account_id =
        this.accountsService.getCurrentAccount()?._id || '';
      transaction.categories = this.selectedCategories;

      if (!this.formService.isEditing) {
        this.transactionsService.createTransaction(transaction);
      } else {
        transaction._id = this.selectedTransaction?._id!;
        this.transactionsService.updateTransaction(transaction);
        this.transactionsService.setSelectedTransaction(transaction);
      }
      this.returnToView();
    }
  }

  public close(): void {
    this.resetForm();
    this.panelService.close();
    this.formService.setEditing(false);
  }

  public cancel(): void {
    this.resetForm();
    this.returnToView();
  }

  private returnToView(): void {
    if (this.formService.isEditing)
      this.panelService.setPanelContent(TransactionViewComponent);
    else this.close();
  }

  private resetForm(): void {
    this.transactionForm.reset();
    this.panelService.clearPanelPortal();
  }

  public filterCategories(event?: MatButtonToggleChange): void {
    this.filteredCategories = this.categoriesService
      .getFilteredCategories(this.transactionForm.value.type)
      .filter((c: Category) => {
        return !this.selectedCategories.find((s: Category) => s._id === c._id);
      });

    if (event) {
      const tType = this.transactionsService.getSelectedTransaction()?.type;
      console.log(this.transactionForm.value.type, tType);

      this.selectedCategories =
        this.transactionForm.value.type !== tType
          ? []
          : [...(this.selectedTransaction?.categories || [])];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const category = this.categoriesService.findCategory(value);
      if (category) {
        this.selectedCategories.push(category);
      }
    }

    event.chipInput!.clear();
  }

  remove(category: Category): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
      this.filteredCategories.push(category);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const category = this.categoriesService.findCategory(event.option.value);

    if (category) {
      this.selectedCategories.push(category);
      const index = this.filteredCategories.indexOf(category);

      if (index >= 0) this.filteredCategories.splice(index, 1);

      this.categoryInput.nativeElement.value = '';
    }
  }
}
