import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public isEditing: Boolean = false;

  constructor() {}

  public setEditing(value: Boolean): void {
    this.isEditing = value;
  }
}
