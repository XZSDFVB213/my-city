import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResturantService } from '../services/resturant-service';
import { AsyncPipe } from '@angular/common';
import { RestaurantCard } from '../../home/components/restaurant-card/restaurant-card';
import { AuthService } from '../../admin/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateRestaurantDialog } from '../dialog/create-restaurant-dialog';
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    AsyncPipe,
    RestaurantCard,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Restaurants {
  private authService = inject(AuthService);
  private restaurantService = inject(ResturantService);
  public restaurants$ = this.restaurantService.getRestaurants();
  protected isAdmin$ = this.authService.isAdmin$;
    private dialog =  inject(MatDialog)

openCreateDialog() {
  
  this.dialog.open(CreateRestaurantDialog,{
    width: '400px'
  }).afterClosed().subscribe(created => {
  if (created) {
    this.restaurants$ = this.restaurantService.getRestaurants();
  }
});
}

}
