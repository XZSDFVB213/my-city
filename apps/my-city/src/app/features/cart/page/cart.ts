import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartItem } from '../component/cart-item';
import { CartService } from '../services/cart-service';
@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Cart {
  private cartService = inject(CartService);
  cart$ = this.cartService.cart$;
  public total$ = this.cartService.total$;
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
}
