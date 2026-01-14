import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CreateOrderDto} from '@my-city/shared-types';
import {environment} from '../../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl
  createOrder(dto: CreateOrderDto) {
    return this.http.post(
      `${this.apiUrl}/orders`,
      dto,
    );
  }
}
