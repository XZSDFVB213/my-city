import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '@my-city/shared-types';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private dishes = new BehaviorSubject<Dish[]>([]);
  dishes$ = this.dishes.asObservable();
  private http = inject(HttpClient);
  public getDishesByRestaurant(restaurantId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(
      `http://localhost:3000/api/dishes/restaurants/${restaurantId}/dishes`,
    ).pipe(tap((data) => this.dishes.next(data)));
  }
  remove(id: string) {
    return this.http.delete(`http://localhost:3000/api/dishes/${id}`);
  }
  createDish(formData: FormData) {
    return this.http
      .post<Dish>(`http://localhost:3000/api/dishes`, formData)
      .pipe(
        tap((data) => {
          this.dishes.next([...this.dishes.value, data]);
        }),
      );
  }
}
