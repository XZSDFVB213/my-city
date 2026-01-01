import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResturantService {
  private http = inject(HttpClient);

  public getRestaurants():Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/api/restaurants');
  }
  public createRestaurant(formData: FormData): Observable<Restaurant> {
    return this.http.post<Restaurant>('http://localhost:3000/api/restaurants', formData);
  }
}
