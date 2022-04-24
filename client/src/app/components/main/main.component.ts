import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('rightPanel', { static: true }) private panel!: MatDrawer;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  private container!: ViewContainerRef;

  constructor(private router: Router, public panelService: PanelService) {}

  public areAccountsVisible(): boolean {
    return this.router.url !== '/categories';
  }

  public ngOnInit(): void {
    this.panelService.setPanelRef(this.panel);
    this.panelService.setViewContainerRef(this.container);
  }
}
