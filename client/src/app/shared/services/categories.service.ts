import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../constants';
import { Category } from '../models/category';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly categoriesSubject = new BehaviorSubject<Category[]>([]);
  public readonly categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient, private uesrService: UserService) {}

  public fetchCategories(): void {
    this.http
      .get<Category[]>(this.getUrlwithQueryParams(this.uesrService.getId()))
      .subscribe((categories: Category[]) => {
        this.categoriesSubject.next(categories);
      });
  }

  public getCategories(): Category[] {
    return this.categoriesSubject.getValue();
  }

  private getUrl(): string {
    return `${BASE_URL}/categories/`;
  }

  private getUrlwithQueryParams(userId: string): string {
    return `${this.getUrl()}?userId=${userId}`;
  }
}
