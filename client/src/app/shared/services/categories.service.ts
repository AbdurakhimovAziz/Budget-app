import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BASE_URL } from '../constants';
import { Category, FormCategory } from '../models/category';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly categoriesSubject = new BehaviorSubject<Category[]>([]);
  public readonly categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient, private uesrService: UserService) {}

  private filterCategories(filter: 'income' | 'expense'): Category[] {
    return this.getCategories().filter((c) => c.type === filter);
  }

  public getFilteredCategories(filter: 'income' | 'expense'): Category[] {
    return this.filterCategories(filter);
  }

  public findCategory(title: string): Category | undefined {
    const lowerTitle = title.toLowerCase();
    return this.getCategories().find(
      (category) => category.title.toLocaleLowerCase() === lowerTitle
    );
  }

  public fetchCategories(): void {
    this.http
      .get<Category[]>(this.getUrlwithQueryParams(this.uesrService.getId()))
      .pipe(
        map((categories: Category[]) =>
          categories.sort((a, b) => a.title.localeCompare(b.title))
        )
      )
      .subscribe((categories: Category[]) => {
        this.categoriesSubject.next(categories);
      });
  }

  public createCategory(category: FormCategory): void {
    this.http
      .post<Category>(this.getUrl(), category)
      .subscribe((category: Category) => {
        this.categoriesSubject.next([...this.getCategories(), category]);
      });
  }

  public updateCategory(category: Category): void {
    this.http
      .put<Category>(this.getUrlWithId(category._id), category)
      .subscribe(() => {
        this.categoriesSubject.next(
          this.getCategories().map((c) =>
            c._id === category._id ? category : c
          )
        );
      });
  }

  public deleteCategory(categoryId: string): void {
    this.http.delete<Category>(this.getUrlWithId(categoryId)).subscribe(() => {
      this.categoriesSubject.next(
        this.getCategories().filter(
          (category: Category) => category._id !== categoryId
        )
      );
    });
  }

  public getCategories(): Category[] {
    return this.categoriesSubject.getValue();
  }

  private getUrl(): string {
    return `${BASE_URL}/categories`;
  }

  public getUrlWithId(categoryId: string): string {
    return `${this.getUrl()}/${categoryId}`;
  }

  private getUrlwithQueryParams(userId: string): string {
    return `${this.getUrl()}?userId=${userId}`;
  }
}
