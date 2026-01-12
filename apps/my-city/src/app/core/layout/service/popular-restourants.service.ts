import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularRestaurantsService {
  private http = inject(HttpClient);
  bashUrl = 'http://localhost:3000';
  getPopularRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.bashUrl}/api/restaurants/popular`)
  }
}
