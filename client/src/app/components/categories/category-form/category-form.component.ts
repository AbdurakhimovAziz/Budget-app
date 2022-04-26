import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormCategory } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { PanelService } from 'src/app/shared/services/panel.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  public categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9\\s]+'),
      Validators.maxLength(128),
    ]),
    type: new FormControl('income', [Validators.required]),
  });

  constructor(
    private panelService: PanelService,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {}

  public create(): void {
    if (this.categoryForm.valid) {
      const category: FormCategory = {
        title: this.categoryForm.value.title,
        type: this.categoryForm.value.type,
        user_id: this.userService.getId(),
      };

      this.categoriesService.createCategory(category);
      this.close();
    } else return;
  }

  public close(): void {
    this.categoryForm.reset();
    this.panelService.close();
  }
}
