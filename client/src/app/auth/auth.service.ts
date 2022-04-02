import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const BASE_URL = 'http://localhost:3000';
interface IToken {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Object> {
    return this.http
      .post(this.getUrl(), { email, password })
      .pipe(tap((res: any) => this.saveToken(res)));
  }

  isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private getUrl(): string {
    return `${BASE_URL}/users/login`;
  }

  private saveToken(token: IToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiresIn', token.expiresIn.toString());
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }
}
