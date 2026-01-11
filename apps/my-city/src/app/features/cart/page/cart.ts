import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CartItem } from '../component/cart-item';
import { CartService } from '../services/cart-service';
import { OrdersService } from '../services/order-service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrderDto } from '@my-city/shared-types';
import { TableService } from '../../../core/layout/service/table.service';

@Component({
  selector: 'app-cart',
  imports: [CartItem, AsyncPipe, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrdersService);
  private tableService = inject(TableService)
  table$ = this.tableService.table$
  cart$ = this.cartService.cart$;
  total$ = this.cartService.total$;

  ngOnInit() {
    this.cartService.getCart();
    const cart = this.cartService.getCart()
    if(!cart) return
    if(this.tableService.isDineIn(cart.restaurantId)){
      this.cartService.setOrderType('В ресторане')
    }
  }
  setOrderType(type: 'Доставка' | 'Самовывоз' | 'В ресторане') {
    this.cartService.setOrderType(type);
  }
  isDineIn(){
    return this.cartService.isDineIn()
  }
  clearCart() {
    this.cartService.clearCart();
  }

  onIncrease(id: string) {
    this.cartService.increaseQuantity(id);
  }

  onDecrease(id: string) {
    this.cartService.decreaseQuantity(id);
  }

  onRemove(id: string) {
    this.cartService.deleteFromCart(id);
  }

 createOrder() {
  this.cart$.pipe(take(1)).subscribe((cart) => {
    if (!cart || !cart.orderType) return;
    const tableId = this.tableService.getTable()
    const dto: CreateOrderDto = {
      restaurantId: cart.restaurantId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      orderType: cart.orderType,
      tableId:tableId?.tableId ?? null,
    };

    this.orderService.createOrder(dto).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.tableService.clear()
        alert('Заказ успешно создан');
      },
      error: () => {
        alert('Ошибка при создании заказа');
      },
    });
  });
}

}
