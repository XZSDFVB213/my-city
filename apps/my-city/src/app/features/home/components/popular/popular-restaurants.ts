import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { RestaurantCard } from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-popular-restaurants',
  imports: [RestaurantCard],
  templateUrl: './popular-restaurants.html',
  styleUrl: './popular-restaurants.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PopularRestaurants {
  restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizzeria Roma',
      cuisine: 'Итальянская кухня',
      imageUrl: 'https://picsum.photos/500/300?1',
      createdAt: '',
      updatedAt: '',
      slug: '',
      isActive: false
    },
    {
      id: '2',
      name: 'Burger Lab',
      cuisine: 'Бургеры и стритфуд',
      imageUrl: 'https://picsum.photos/500/300?2',
      createdAt: '',
      updatedAt: '',
      slug: '',
      isActive: false
    },
    {
      id: '3',
      name: 'Sushi Way',
      cuisine: 'Японская кухня',
      imageUrl: 'https://picsum.photos/500/300?3',
      createdAt: '',
      updatedAt: '',
      slug: '',
      isActive: false
    },
    {
      id: '4',
      name: 'Sushi Way',
      cuisine: 'Японская кухня',
      imageUrl: 'https://picsum.photos/500/300?3',
      createdAt: '',
      updatedAt: '',
      slug: '',
      isActive: false
    },
  ];
}
