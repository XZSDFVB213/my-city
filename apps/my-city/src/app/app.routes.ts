import { adminRoutes } from './features/admin/routes';
// import { restaurantRoutes } from './features/restaurants/routes';
// import { dishesRoutes } from './features/dishes/routes';

export const appRoutes = [
  ...adminRoutes,
  {path:'contacts',loadComponent: () => import('./features/contact/pages/contact').then(m => m.ContactComponent)},
//   ...restaurantRoutes,
//   ...dishesRoutes,
  { path: '**', redirectTo: '' }
];