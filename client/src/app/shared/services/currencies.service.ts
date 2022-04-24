import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BASE_URL } from '../constants';
import { Currency } from '../models/currency';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);

  constructor(private http: HttpClient, private usersService: UserService) {}

  public fetchCurrencies(): void {
    this.http
      .get<Currency[]>(this.getUrl())
      .pipe(
        map((currencies: Currency[]) =>
          currencies.sort((a, b) => a.cc.localeCompare(b.cc))
        )
      )
      .subscribe((currencies: Currency[]) => {
        this.currenciesSubject.next(currencies);
      });
  }

  public getCurrencies(): Currency[] {
    return this.currenciesSubject.getValue();
  }

  public getFilteredCurrencies(): Currency[] {
    return Array.from(new Set(this.getCurrencies().map((a) => a.cc))).map(
      (cc) => {
        return this.getCurrencies().find((a) => a.cc === cc)!;
      }
    );
  }

  private getUrl(): string {
    return `${BASE_URL}/currencies/`;
  }

  public getDefaultCurrency(): Currency {
    return (
      this.getCurrencies().find((currency: Currency) =>
        currency.country.includes(this.usersService.getUser()?.country || '')
      ) || this.getCurrencies()[0]
    );
  }
}
