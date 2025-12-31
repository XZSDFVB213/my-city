import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../features/admin/services/auth-service';

export const AdminTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const token = auth.token;
  if (token) {
    const cloned = req.clone({
      setHeaders: { 'x-admin-key': token }
    });
    return next(cloned);
  }
  return next(req);
};
