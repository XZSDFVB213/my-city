import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ResturantService } from '../services/resturant-service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../admin/services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateRestaurantDialog } from '../dialog/create-restaurant-dialog';
import { RestaurantCard } from '../../../core/layout/restaurant-card/restaurant-card';
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
export class Restaurants implements OnInit {
  private authService = inject(AuthService);
  private restaurantService = inject(ResturantService);
  public restaurants$ = this.restaurantService.restaurants$;
  protected isAdmin$ = this.authService.isAdmin$;
    private dialog =  inject(MatDialog)

  ngOnInit() {
    console.log('Console');
    this.restaurantService.getRestaurants().subscribe();
  }
openCreateDialog() {
  
  this.dialog.open(CreateRestaurantDialog,{
    width: '400px'
  });
}
  
onDeleteRestaurant(id: string) {
  console.log(123123123,id);
  this.restaurantService.deleteRestaurant(id).subscribe();
}
}
