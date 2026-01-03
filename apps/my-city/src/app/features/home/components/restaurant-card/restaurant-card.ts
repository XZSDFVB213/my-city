import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
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
@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    MatButtonModule,
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
