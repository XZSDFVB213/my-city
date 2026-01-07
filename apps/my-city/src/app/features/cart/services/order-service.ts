import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import  {OrderSchema} from '@my-city/shared-entities';
import { HttpClient } from '@angular/common/http';
import {CreateOrderDto} from '@my-city/shared-types';
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/orders';

  createOrder(dto: CreateOrderDto): Observable<OrderSchema> {
    return this.http.post<OrderSchema>(this.baseUrl, dto);
  }
}
