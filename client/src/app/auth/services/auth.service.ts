import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

const BASE_URL = 'http://localhost:3000';
interface IToken {
  token: string;
  expiresIn: string;
}

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
      })
    );
  }

<<<<<<< HEAD
  public isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresIn');
=======
  isLoggedIn(): boolean {
    const expiresIn = localStorage.getItem('expiresAt');
>>>>>>> ba85ab6 (feat: add auth interceptor)

    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private getUrl(): string {
    return `${BASE_URL}/users/login`;
  }

  private saveToken(token: IToken): void {
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
