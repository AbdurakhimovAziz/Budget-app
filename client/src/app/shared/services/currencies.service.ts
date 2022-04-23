import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../constants';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);

  constructor(private http: HttpClient) {}

  public fetchCurrencies(): void {
    this.http
      .get<Currency[]>(this.getUrl())
      .subscribe((currencies: Currency[]) => {
        this.currenciesSubject.next(currencies);
      });
  }

  public getCurrencies(): Currency[] {
    return this.currenciesSubject.getValue();
  }

  private getUrl(): string {
    return `${BASE_URL}/currencies/`;
  }
}
