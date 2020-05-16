import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AuthResponseData {
  token: string;
}

export class User {
  constructor(public username: string, public token: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.APIAddress + 'auth/register', {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(username, resData.token);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.APIAddress + 'auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(username, resData.token);
        })
      );
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
  }
}
