import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RestaurantCard } from '../../../../core/layout/restaurant-card/restaurant-card';
import { PopularRestaurantsService } from '../../../../core/layout/service/popular-restourants.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-popular-restaurants',
  imports: [RestaurantCard, AsyncPipe],
  templateUrl: './popular-restaurants.html',
  styleUrl: './popular-restaurants.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PopularRestaurants implements OnInit {
  private popularRestaurants$ = inject(PopularRestaurantsService)

  restaurants$ = this.popularRestaurants$.getPopularRestaurants();
  
ngOnInit(): void {
  console.log(this.restaurants$);
}
}
