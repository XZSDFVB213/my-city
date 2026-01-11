import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CreateOrderDto} from '@my-city/shared-types';
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);

  createOrder(dto: CreateOrderDto) {
    return this.http.post(
      'http://localhost:3000/api/orders',
      dto,
    );
  }
}
