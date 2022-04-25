import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-control-item',
  templateUrl: './control-item.component.html',
  styleUrls: ['./control-item.component.scss'],
})
export class ControlItemComponent {
  @Input() label: string = '';
  @Input() iconName: string = '';
  @Output() emitClick: EventEmitter<MouseEvent> = new EventEmitter();

  public onClick(event: MouseEvent): void {
    this.emitClick.emit(event);
  }
}
