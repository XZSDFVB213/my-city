import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResturantService {
  private http = inject(HttpClient);
  private restautants = new BehaviorSubject<Restaurant[]>([])
  public restaurants$ = this.restautants.asObservable()
  
public getRestaurants():Observable<Restaurant[]>{
   return this.http.get<Restaurant[]>('http://localhost:3000/api/restaurants').pipe(tap((data) => {
     this.restautants.next(data)
   }))
}
  public createRestaurant(formData: FormData): Observable<Restaurant> {
    return this.http.post<Restaurant>('http://localhost:3000/api/restaurants', formData).pipe(
      tap((data) =>{
        this.restautants.next([...this.restautants.value, data])
      })
    )
  }
  public deleteRestaurant(id: string): Observable<Restaurant> {
    console.log(id)
    return this.http.delete<Restaurant>(`http://localhost:3000/api/restaurants/${id}`).pipe(
      tap(() => {
        this.restautants.next(this.restautants.value.filter((r) => r.id !== id));
      })
    );
  }
  public getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`http://localhost:3000/api/restaurants/${id}`);
  }
}


