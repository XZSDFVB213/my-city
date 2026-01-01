import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { Footer } from './core/layout/footer/footer';
@Component({
  imports: [ RouterModule,HeaderComponent,Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'my-city';
}
