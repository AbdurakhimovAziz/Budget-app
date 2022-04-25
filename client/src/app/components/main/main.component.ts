import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { PanelService } from 'src/app/shared/services/panel.service';
import { RouterService } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('rightPanel', { static: true }) private panel!: MatDrawer;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  private container!: ViewContainerRef;

  constructor(
    public routerService: RouterService,
    public panelService: PanelService
  ) {}

  public ngOnInit(): void {
    this.panelService.setPanelRef(this.panel);
    this.panelService.setViewContainerRef(this.container);
  }
}
