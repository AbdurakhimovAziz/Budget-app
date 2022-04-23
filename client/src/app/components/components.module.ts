import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from '../shared/modules/app-material.module';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountsItemComponent } from './accounts/accounts-item/accounts-item.component';
import { AccountsListComponent } from './accounts/accounts-list/accounts-list.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ControlsComponent } from './controls/controls.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsItemComponent } from './transactions/transactions-item/transactions-item.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesItemComponent } from './categories/categories-item/categories-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CategoriesComponent,
    LoginComponent,
    NotFoundComponent,
    StatisticsComponent,
    MainComponent,
    AccountsComponent,
    AccountsListComponent,
    AccountsItemComponent,
    FooterComponent,
    TransactionsComponent,
    ControlsComponent,
    TransactionsListComponent,
    TransactionsItemComponent,
    CategoriesListComponent,
    CategoriesItemComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],

  exports: [],
})
export class ComponentsModule {}
