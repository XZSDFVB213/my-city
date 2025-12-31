import { Routes } from '@angular/router';
import { AdminLogin } from './pages/admin-login';

export const adminRoutes: Routes = [
  {
    path: 'admin/login',
    component: AdminLogin,
  },
  // Пример будущих страниц админа:
  // {
  //   path: 'admin/dashboard',
  //   component: AdminDashboardComponent,
  //   canActivate: [AdminGuard]
  // },
];