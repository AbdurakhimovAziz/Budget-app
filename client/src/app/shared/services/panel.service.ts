import { BooleanInput } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  public isOpen: BooleanInput = false;
  private panelRef: MatDrawer | null = null;

  constructor() {}

  public setPanelRef(panelRef: MatDrawer): void {
    this.panelRef = panelRef;
    panelRef.closedStart.subscribe(() => {
      this.isOpen = false;
    });
  }

  public getPanelRef(): MatDrawer | null {
    return this.panelRef;
  }

  public open(): void {
    console.log('open', this.isOpen);
    this.panelRef?.open();
    this.isOpen = true;
  }

  public close(): void {
    this.panelRef?.close();
    this.isOpen = false;
  }
}
