import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { AdminTokenInterceptor } from './core/interceptors/admin-token.interceptor';
import { AuthService } from './features/admin/services/auth-service';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([AdminTokenInterceptor]),withFetch()),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.init(); // может быть Promise или void
    }),
    provideClientHydration()
  ],
};