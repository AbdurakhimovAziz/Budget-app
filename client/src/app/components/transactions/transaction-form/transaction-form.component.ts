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
      [Validators.required]
    ),
    type: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.type : 'income',
      [Validators.required]
    ),
    amount: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.amount : '',
      [Validators.required]
    ),
    date: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.date : '',
      [Validators.required]
    ),
    payee: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.payee : ''
    ),
    description: new FormControl(
      this.formService.isEditing ? this.selectedTransaction?.description : ''
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

  public filterCategories(): void {
    this.filteredCategories = this.categoriesService.getFilteredCategories(
      this.transactionForm.value.type
    );
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
      console.log('selected', category);

      const index = this.filteredCategories.indexOf(category);
      console.log('index', index);

      if (index >= 0) this.filteredCategories.splice(index, 1);

      this.categoryInput.nativeElement.value = '';
    }
  }
}
