import { Routes } from '@angular/router';
import { Restaurants } from './pages/restaurants';
import { RestaurantDetail } from '../restaurant-detail/page/restaurant-detail';

export const restaurantsRoutes: Routes = [
  {
    path: '',
    component: Restaurants,
  },
  {
    path: ':id',
    component: RestaurantDetail,
  },
];
