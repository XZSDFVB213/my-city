import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { Footer } from './core/layout/footer/footer';
import { CartService } from './features/cart/services/cart-service';
@Component({
  imports: [ RouterModule,HeaderComponent,Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit{
  private cartService = inject(CartService)
  ngOnInit() {
    this.cartService.init()
  }
}
