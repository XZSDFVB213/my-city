import { adminRoutes } from './features/admin/routes';
// import { restaurantRoutes } from './features/restaurants/routes';
// import { dishesRoutes } from './features/dishes/routes';

export const appRoutes = [
  ...adminRoutes,
//   ...restaurantRoutes,
//   ...dishesRoutes,
  { path: '**', redirectTo: '' }
];