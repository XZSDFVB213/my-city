import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '@my-city/shared-types';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DishService {
  private dishes = new BehaviorSubject<Dish[]>([]);
  dishes$ = this.dishes.asObservable();
  private categories = new BehaviorSubject<string[]>([]);
  categories$ = this.categories.asObservable();
  private http = inject(HttpClient);
  private bashUrl = environment.apiUrl;
  public getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(
      `${this.bashUrl}/dishes/restaurants/${restaurantId}/dishes`,
    ).pipe(tap((data) => this.dishes.next(data)));
  }
  remove(id: string) {
    return this.http.delete(`${this.bashUrl}/dishes/${id}`);
  }
  createDish(formData: FormData) {
    return this.http
      .post<Dish>(`${this.bashUrl}/dishes`, formData)
      .pipe(
        tap((data) => {
          this.dishes.next([...this.dishes.value, data]);
        }),
      );
  }
  getCategories() {
  return this.http.get<string[]>(`${this.bashUrl}/dishes/categories`).subscribe((data) => this.categories.next(data));
}
}
