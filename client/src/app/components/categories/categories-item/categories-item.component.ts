import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.scss'],
})
export class CategoriesItemComponent implements OnInit {
  @Input() public category!: Category;
  public isEditing: boolean = false;

  public categoryForm!: FormGroup;
  @ViewChild('input', { static: false }) inputEl!: ElementRef;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      title: new FormControl(this.category.title, [Validators.required]),
    });
  }

  public setisEditing(isEditing: boolean): void {
    if (isEditing)
      setTimeout(() => {
        this.inputEl.nativeElement.focus();
      });

    this.isEditing = isEditing;
  }

  public onBlur(): void {
    this.setisEditing(false);
  }

  public updateCategory(): void {
    if (this.categoryForm.valid) {
      const updatedCategory: Category = {
        _id: this.category._id,
        title: this.categoryForm.value.title,
        type: this.category.type,
        user_id: this.category.user_id,
      };
      this.categoriesService.updateCategory(updatedCategory);
      this.setisEditing(false);
    }
  }

  public delete(): void {
    this.categoriesService.deleteCategory(this.category._id);
  }
}
