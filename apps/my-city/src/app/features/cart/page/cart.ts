import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CartItem } from '../component/cart-item';
import { CartService } from '../services/cart-service';
import { OrdersService } from '../services/order-service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrderDto } from '@my-city/shared-types';
import { TableService } from '../../../core/layout/service/table.service';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-cart',
  imports: [
    CartItem,
    AsyncPipe,
    MatButtonModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatInputModule,
    MatIcon
],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrdersService);
  private tableService = inject(TableService);
  table$ = this.tableService.table$;

  cart$ = this.cartService.cart$;
  total$ = this.cartService.total$;

  ngOnInit() {
    this.cartService.getCart();
    const cart = this.cartService.getCart();
    if (!cart) return;
    if (this.tableService.isDineIn(cart.restaurantId)) {
      this.cartService.setOrderType('В ресторане');
    }
  }
  readonly number = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\+?\d{10,15}$/),
    Validators.minLength(10),
  ]);
  errorMessage = signal('');
  updateErrorMessage() {
    if (this.number.hasError('required')) {
      this.errorMessage.set('Вы должны ввести номер телефона');
    }
    if (this.number.hasError('minlength')) {
      this.errorMessage.set('Ваш номер должен содержать 10 цифр');
    }
    if (this.number.hasError('pattern')) {
      this.errorMessage.set('Некорректный формат номера');
    }
  } 
  setOrderType(type: 'Доставка' | 'Самовывоз' | 'В ресторане') {
    this.cartService.setOrderType(type);
  }
  isDineIn() {
    return this.cartService.isDineIn();
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
    if (!this.number.valid){
      this.updateErrorMessage();
    }
    this.cart$.pipe(take(1)).subscribe((cart) => {
      if (!cart || !cart.orderType) return;
      const tableId = this.tableService.getTable();
      const dto: CreateOrderDto = {
        restaurantId: cart.restaurantId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        orderType: cart.orderType,
        tableId: tableId?.tableId ?? null,
        phoneNumber: this.number.value ?? null,
      };

      this.orderService.createOrder(dto).subscribe({
        next: () => {
          this.cartService.clearCart();
          this.tableService.clear();
          alert('Заказ успешно создан');
        },
        error: () => {
          alert('Ошибка при создании заказа');
        },
      });
    });
  }

}
