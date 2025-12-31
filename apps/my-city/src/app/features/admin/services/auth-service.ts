import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isAdmin = false;
  public apiUrl = 'http://localhost:3000/api';
  private _token$ = new BehaviorSubject<string | null>(null);
  public token$ = this._token$.asObservable();
  private http = inject(HttpClient);
  get isAdmin() {
    return this._isAdmin;
  }
  constructor() {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this._isAdmin = true;
      this._token$.next(token);
    }
  }
  public login(secret: string) {
    return this.http
      .post<{
        isAdmin: boolean;
        token: string;
      }>(`${this.apiUrl}/auth/admin/login`, { secret })
      .pipe(
        tap((res) => {
          if (res.isAdmin) {
            this._isAdmin = true;
            this._token$.next(res.token);
            localStorage.setItem('adminToken', res.token);
          }
        }),
      );
  }
  public logout() {
    this._isAdmin = false;
    this._token$.next(null);
    localStorage.removeItem('adminToken');
  }
  get token() {
    return this._token$.value;
  }
}
