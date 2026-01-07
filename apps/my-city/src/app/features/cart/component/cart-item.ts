import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem as Cartitem } from '@my-city/shared-types';
@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  @Input({required: true}) cartItem!:Cartitem
  @Output() increase = new EventEmitter<string>()
  @Output() decrease = new EventEmitter<string>()
  @Output() remove = new EventEmitter<string>()

  onIncrease(){
    this.increase.emit(this.cartItem.dishId)
  }
  onDecrease(){
    this.decrease.emit(this.cartItem.dishId)
  }
  onRemove(){
    this.remove.emit(this.cartItem.dishId)
  }
}
