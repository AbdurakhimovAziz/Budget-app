import {
  ComponentPortal,
  ComponentType,
  Portal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private panel!: MatDrawer;
  private viewContainerRef!: ViewContainerRef;
  private panelPortal$ = new BehaviorSubject<Portal<any> | null>(null);

  public get panelPortal(): Observable<Portal<any> | null> {
    return from(this.panelPortal$);
  }

  public setPanelRef(panel: MatDrawer): void {
    this.panel = panel;
  }

  public setViewContainerRef(vcr: ViewContainerRef): void {
    this.viewContainerRef = vcr;
  }

  setPanelPortal(panelPortal: Portal<any>): void {
    this.panelPortal$.next(panelPortal);
  }

  public setPanelContent(
    componentOrTemplateRef: ComponentType<any> | TemplateRef<any>
  ): void {
    let portal: Portal<any>;
    if (componentOrTemplateRef instanceof TemplateRef) {
      portal = new TemplatePortal(
        componentOrTemplateRef,
        this.viewContainerRef
      );
    } else {
      portal = new ComponentPortal(componentOrTemplateRef);
    }
    this.panelPortal$.next(portal);
  }

  private clearPanelPortal() {
    this.panelPortal$.next(null);
  }

  public open(portal?: Portal<any>): Promise<MatDrawerToggleResult> {
    if (portal) {
      this.panelPortal$.next(portal);
    }
    return this.panel.open();
  }

  public toggle(): Promise<MatDrawerToggleResult> {
    return this.panel.toggle();
  }

  public close(): Promise<MatDrawerToggleResult> {
    return this.panel.close();
  }
}
