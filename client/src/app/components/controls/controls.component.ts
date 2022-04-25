import { Component } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { AccountFormComponent } from '../accounts/account-form/account-form.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  constructor(
    private formService: FormService,
    private panelService: PanelService
  ) {}

  public openAddForm(): void {
    this.formService.setEditing(false);
    this.panelService.setPanelContent(AccountFormComponent);
    this.panelService.open();
  }
}
