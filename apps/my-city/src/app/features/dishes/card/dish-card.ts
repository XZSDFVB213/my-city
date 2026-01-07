import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCardActions,
  MatCardContent,
  MatCard,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Dish } from '@my-city/shared-types';
import { AuthService } from '../../admin/services/auth-service';

@Component({
  selector: 'app-dish-card',
  imports: [
    MatButtonModule,
    AsyncPipe,
    RouterLink,
    MatCardActions,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.scss',
})
export class DishCard {
  private authService = inject(AuthService);

  @Input() dish!: Dish;
  @Output() order = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  protected isAdmin$ = this.authService.isAdmin$;

  getInBasket(id: string) {
    console.log(id);
    // this.order.emit(id);
  }

  onDelete() {
    this.delete.emit(this.dish.id);
  }
}
