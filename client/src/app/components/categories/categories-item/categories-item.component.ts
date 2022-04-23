import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.scss'],
})
export class CategoriesItemComponent {
  @Input() public category!: Category;

  constructor() {}
}
