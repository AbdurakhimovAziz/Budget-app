import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  @Input() public categories!: Category[];

  constructor() { }

}
