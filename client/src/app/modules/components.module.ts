import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AppMaterialModule } from './app-material.module';
import { AccountsItemComponent } from '../accounts/accounts-item/accounts-item.component';
import { AccountsListComponent } from '../accounts/accounts-list/accounts-list.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { CategoriesComponent } from '../categories/categories.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

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
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],

  exports: [
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
  ],
})
export class ComponentsModule {}
