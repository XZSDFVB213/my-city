import { adminRoutes } from './features/admin/routes';
// import { restaurantRoutes } from './features/restaurants/routes';
// import { dishesRoutes } from './features/dishes/routes';

export const appRoutes = [
  ...adminRoutes,
  {path:'contacts',loadComponent: () => import('./features/contact/pages/contact').then(m => m.ContactComponent)},
  {path:'',loadComponent: () => import('./features/home/pages/home-page').then(m => m.HomePage)},
  {
  path: 'restaurants',
  loadChildren: () =>
    import('./features/restaurants/restautants.routes')
      .then(m => m.restaurantsRoutes),
},
//   ...restaurantRoutes,
//   ...dishesRoutes,
  { path: '**', redirectTo: '' }
];