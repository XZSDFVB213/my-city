import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  public apiUrl = environment.apiUrl;

  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this._isAdmin$.asObservable();

  private _token$ = new BehaviorSubject<string | null>(null);
  public token$ = this._token$.asObservable();

  /** Вызывай один раз при старте приложения (APP_INITIALIZER или ngOnInit) */
  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem('adminToken');
    if (token) {
      this._isAdmin$.next(true);
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
          if (res.isAdmin && isPlatformBrowser(this.platformId)) {
            this._isAdmin$.next(true);
            this._token$.next(res.token);
            localStorage.setItem('adminToken', res.token);
          }
        }),
      );
  }

  public logout() {
    this._isAdmin$.next(false);
    this._token$.next(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('adminToken');
    }
  }

  get token() {
    return this._token$.value;
  }
}