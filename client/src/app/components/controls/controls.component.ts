import { Component } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { AccountFormComponent } from '../accounts/account-form/account-form.component';
import { CategoryFormComponent } from '../categories/category-form/category-form.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  constructor(
    private formService: FormService,
    private panelService: PanelService,
    public routerService: RouterService
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
}
