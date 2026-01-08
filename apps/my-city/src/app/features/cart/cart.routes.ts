import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/cart').then(m => m.Cart),
  },
  
];
