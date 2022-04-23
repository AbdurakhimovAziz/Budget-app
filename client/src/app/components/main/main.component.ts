import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('rightPanel', { static: true }) panel!: MatDrawer;

  constructor(private router: Router, public panelService: PanelService) {}

  public areAccountsVisible(): boolean {
    return this.router.url !== '/categories';
  }

  public ngOnInit(): void {
    this.panelService.setPanelRef(this.panel);
  }
}
