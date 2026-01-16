import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopularRestaurantsService {
  private http = inject(HttpClient);
  private bashUrl = environment.apiUrl;
  getPopularRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.bashUrl}/restaurants/popular`)
  }
}
