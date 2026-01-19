import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ResturantService } from '../../restaurants/services/resturant-service';
import { DishService } from '../../dishes/services/dish-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Dish, Restaurant } from '@my-city/shared-types';
import { DishCard } from '../../dishes/card/dish-card';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../admin/services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDishDialog } from '../../dishes/dialog/create-dish-dialog';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../cart/services/cart-service';
import { TableService } from '../../../core/layout/service/table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-restaurant-detail',
  imports: [DishCard, AsyncPipe, MatButtonModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantDetail implements OnInit {
  private authService = inject(AuthService);
  private restaurantService = inject(ResturantService);
  private dishService = inject(DishService);
  private rout = inject(ActivatedRoute);
  protected isAdmin$ = this.authService.isAdmin$;
  private dialog = inject(MatDialog);
  private cartService = inject(CartService);
  private table!: string;
  private snackBar = inject(MatSnackBar);
  public id!: string;
  restaurant$?: Observable<Restaurant>;
  dishes$? = this.dishService.dishes$;

  private tableService = inject(TableService);

  ngOnInit() {
    const params = this.rout.snapshot.params;

    // ресторан
    this.id = params['restaurantId'] ?? params['id'];

    // стол (если есть)
    const tableId = params['tableId'];

    if (tableId) {
      this.tableService.setTable({
        restaurantId: this.id,
        tableId,
      });
    }

    this.restaurant$ = this.restaurantService.getRestaurantById(this.id);
    this.dishService.getDishesByRestaurant(this.id).subscribe();
  }

  openCreateDialog() {
    this.dialog.open(CreateDishDialog, {
      width: '400px',
      data: { restaurantId: this.id },
    });
  }

  onDelete(id: string) {
    this.dishService.remove(id).subscribe();
  }

  getInBasket(dish: Dish) {
    this.cartService.addToCart(
      {
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        description: dish.description,
        quantity: 1,
        imageUrl: dish.imageUrl,
      },
      this.id,
    );
    this.snackBar.open('Блюдо добавлено в корзину', 'Ок', { duration: 2000 });
  }
}
