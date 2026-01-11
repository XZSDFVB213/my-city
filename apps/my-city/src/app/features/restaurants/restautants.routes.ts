import { Routes } from '@angular/router';
import { Restaurants } from './pages/restaurants';

export const restaurantsRoutes: Routes = [
  {
    path: '',
    component: Restaurants,
  },
  {
    path: ':restaurantId/table/:tableId',
    loadComponent: () =>
      import('../restaurant-detail/page/restaurant-detail')
        .then(m => m.RestaurantDetail),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../restaurant-detail/page/restaurant-detail')
        .then(m => m.RestaurantDetail),
  },
];
