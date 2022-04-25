import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BASE_URL } from '../constants';
import { AccountCurrency } from '../models/account-currency';
import { Currency } from '../models/currency';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);
  private readonly AccountCurrenciesSubject = new BehaviorSubject<
    AccountCurrency[]
  >([]);

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

    this.http
      .get<AccountCurrency[]>(`${this.getUrl()}/accountCurrencies`)
      .pipe(
        map((currencies: AccountCurrency[]) =>
          currencies.sort((a, b) => a.cc.localeCompare(b.cc))
        )
      )
      .subscribe((currencies: AccountCurrency[]) => {
        this.AccountCurrenciesSubject.next(currencies);
      });
  }

  public getCurrencies(): Currency[] {
    return this.currenciesSubject.getValue();
  }

  public getAccountCurrencies(): AccountCurrency[] {
    return this.AccountCurrenciesSubject.getValue();
  }

  public getAccCurrencyByCode(cc: string): AccountCurrency {
    return this.getAccountCurrencies().find(
      (currency: AccountCurrency) => currency.cc === cc
    )!;
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
