import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {Restaurant} from '@my-city/shared-types';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-restaurant-card',
  imports: [MatButtonModule,RouterLink,MatCardActions,MatCardContent,MatCard],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RestaurantCard {
    @Input({ required: true }) restaurant!: Restaurant;
}
