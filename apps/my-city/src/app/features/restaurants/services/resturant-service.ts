import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from '@my-city/shared-types';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResturantService {
  private http = inject(HttpClient);
  private restautants = new BehaviorSubject<Restaurant[]>([])
  public restaurants$ = this.restautants.asObservable()
  private bashUrl = environment.apiUrl
public getRestaurants():Observable<Restaurant[]>{
   return this.http.get<Restaurant[]>(`${this.bashUrl}/restaurants`).pipe(tap((data) => {
     this.restautants.next(data)
   }))
}
  public createRestaurant(formData: FormData): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.bashUrl}/restaurants`, formData).pipe(
      tap((data) =>{
        this.restautants.next([...this.restautants.value, data])
      })
    )
  }
  public deleteRestaurant(id: string): Observable<Restaurant> {
    console.log(id)
    return this.http.delete<Restaurant>(`${this.bashUrl}/restaurants/${id}`).pipe(
      tap(() => {
        this.restautants.next(this.restautants.value.filter((r) => r.id !== id));
      })
    );
  }
  public getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.bashUrl}/restaurants/${id}`);
  }
  
}


