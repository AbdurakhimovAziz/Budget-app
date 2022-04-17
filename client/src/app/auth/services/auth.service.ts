import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/shared/constants';
import { Token } from 'src/app/shared/models/token';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private user: UserService) {}

  public login(email: string, password: string): Observable<Object> {
    return this.http.post(this.getUrl(), { email, password }).pipe(
      tap((res: any) => {
        this.saveToken(res);
        this.user.setUser(res.user);
      }),
      catchError((err) => throwError(() => '401'))
    );
  }

  public isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresAt');

    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private getUrl(): string {
    return `${BASE_URL}/users/login`;
  }

  public saveToken(token: Token): void {
    const { token: idToken, expiresIn } = token;
    const expiresAt = Date.now() + parseInt(expiresIn) * 1000 * 60 * 60;

    localStorage.setItem('token', idToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    this.user.setUser(null);
  }
}
