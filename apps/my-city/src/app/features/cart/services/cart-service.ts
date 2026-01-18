import { inject, Injectable } from '@angular/core';
import { Cart, CartItem } from '@my-city/shared-types';
import { BehaviorSubject, map } from 'rxjs';
import { TableService } from '../../../core/layout/service/table.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  private tableService = inject(TableService);
  private platformId = inject(PLATFORM_ID);

  cart$ = this.cartSubject.asObservable();
  total$ = this.cart$.pipe(
    map((cart) =>
      cart?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    ),
  );

  private CART_KEY = 'cart';

  /** ⚠️ Вызывать ТОЛЬКО в браузере */
  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem(this.CART_KEY);
    if (saved) {
      this.cartSubject.next(JSON.parse(saved));
    }
  }

  private sync(cart: Cart | null) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (cart) {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(this.CART_KEY);
    }
  }

  addToCart(item: CartItem, restaurantId: string) {
    const cart = this.cartSubject.value;

    if (!cart) {
      const newCart: Cart = {
        restaurantId,
        items: [{ ...item, quantity: 1 }],
        totalPrice: item.price,
        orderType: 'Доставка',
      };

      this.cartSubject.next(newCart);
      this.sync(newCart);
      return;
    }

    if (cart.restaurantId !== restaurantId) {
      throw new Error('Нельзя добавлять блюда из разных ресторанов');
    }

    const exists = cart.items.some((i) => i.dishId === item.dishId);

    const items = exists
      ? cart.items.map((i) =>
          i.dishId === item.dishId
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      : [...cart.items, { ...item, quantity: 1 }];

    const updatedCart = {
      ...cart,
      items,
      totalPrice: cart.totalPrice + item.price,
    };

    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  increaseQuantity(dishId: string) {
    const cart = this.cartSubject.value;
    if (!cart) return;

    const item = cart.items.find((i) => i.dishId === dishId);
    if (!item) return;

    const updatedCart = {
      ...cart,
      items: cart.items.map((i) =>
        i.dishId === dishId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
      totalPrice: cart.totalPrice + item.price,
    };

    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  decreaseQuantity(dishId: string) {
    const cart = this.cartSubject.value;
    if (!cart) return;

    const item = cart.items.find((i) => i.dishId === dishId);
    if (!item) return;

    const items =
      item.quantity === 1
        ? cart.items.filter((i) => i.dishId !== dishId)
        : cart.items.map((i) =>
            i.dishId === dishId
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          );

    if (items.length === 0) {
      this.clearCart();
      return;
    }

    const updatedCart = {
      ...cart,
      items,
      totalPrice: cart.totalPrice - item.price,
    };

    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  deleteFromCart(dishId: string) {
    const cart = this.cartSubject.value;
    if (!cart) return;

    const updatedCart = {
      ...cart,
      items: cart.items.filter((i) => i.dishId !== dishId),
    };

    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  clearCart() {
    this.cartSubject.next(null);
    this.sync(null);
  }

  setOrderType(type: 'Доставка' | 'Самовывоз' | 'В ресторане') {
    const cart = this.cartSubject.value;
    if (!cart) return;

    const updatedCart = { ...cart, orderType: type };
    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  isDineIn() {
    const cart = this.cartSubject.value;
    if (!cart) return false;
    return this.tableService.isDineIn(cart.restaurantId);
  }
  getCart(){
    return this.cartSubject.value;
  }
}