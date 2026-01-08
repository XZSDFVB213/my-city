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

@Component({
  selector: 'app-cart',
  imports: [CartItem, AsyncPipe,MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrdersService);

  cart$ = this.cartService.cart$;
  total$ = this.cartService.total$;

  ngOnInit() {
    this.cartService.getCart();
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
    this.cart$
      .pipe(take(1))
      .subscribe((cart) => {
        if (!cart) return;

        const dto = {
          restaurantId: cart.restaurantId,
          items: cart.items,
          totalPrice: cart.totalPrice,
        };

        this.orderService.createOrder(dto).subscribe({
          next: () => {
            this.cartService.clearCart();
            // тут позже:
            // snackbar / redirect / success message
            alert('Заказ успешно создан');
          },
          error: () => {
              alert('Произошла ошибка при создании заказа');
          },
        });
      });
  }
}
