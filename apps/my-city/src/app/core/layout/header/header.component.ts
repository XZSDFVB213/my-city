import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../features/cart/services/cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private cartService = inject(CartService)
  links = [
    {id:1, name: 'Главная', path: '/' },
    {id:2, name: 'Рестораны', path: '/restaurants' },
    {id:3, name: 'Контакты', path: '/contacts' },
    {id:4,name:'Корзина',path:'/cart'},
  ];
  cartCount$ = this.cartService.itemsCount$
}