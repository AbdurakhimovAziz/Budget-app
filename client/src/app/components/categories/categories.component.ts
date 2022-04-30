import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public filteredCategories: Category[] = [];

  constructor(public categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.filteredCategories$.subscribe((cat) => {
      this.filteredCategories = [...cat];
    });

    this.categoriesService.filter$.subscribe((filter) => {
      if (filter !== '')
        this.filteredCategories =
          this.categoriesService.filterCategories(filter);
      else
        this.filteredCategories = [...this.categoriesService.getCategories()];
    });
  }
}
