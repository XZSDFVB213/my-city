import {
  APP_BOOTSTRAP_LISTENER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AdminTokenInterceptor } from './core/interceptors/admin-token.interceptor';
import { AuthService } from './features/admin/services/auth-service';
export function initAuth(auth:AuthService) {
  return async () =>{
    await auth.init();
  }
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([AdminTokenInterceptor])),
    {
      provide:APP_BOOTSTRAP_LISTENER,
      useFactory: initAuth,
      multi: true,
      deps:[AuthService]
    }
  ],
};
