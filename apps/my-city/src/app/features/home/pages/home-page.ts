import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from '../components/hero-section/hero-section';
import { PopularRestaurants } from '../components/popular/popular-restaurants';
import { Advantages } from '../components/advantages/advantages';
@Component({
  selector: 'app-home-page',
  imports: [HeroSection,PopularRestaurants,Advantages],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomePage {}
