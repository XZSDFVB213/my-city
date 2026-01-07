import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Restaurant } from '@my-city/shared-types';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../features/admin/services/auth-service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    MatButtonModule,
    AsyncPipe,
    RouterLink,
    MatCardActions,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantCard implements OnInit {
  private authSerive = inject(AuthService)
  isAdmin$ = this.authSerive.isAdmin$
  @Input({ required: true }) restaurant!: Restaurant;
  ngOnInit(): void {
      console.log(this.restaurant);
      console.log('Coaaaa')
  }
  @Output() delete = new EventEmitter<string>();
  onDelete() {
  if (this.restaurant) {
    console.log(this.restaurant.id);
    this.delete.emit(this.restaurant.id);
  } else{
    console.log('Restaurant not found');
  }
}
}
