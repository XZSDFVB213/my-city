import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HeroSection } from '../components/hero-section/hero-section';
import { PopularRestaurants } from '../components/popular/popular-restaurants';
import { Advantages } from '../components/advantages/advantages';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-home-page',
  imports: [HeroSection,PopularRestaurants,Advantages],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit{
  private title = inject(Title)
  private meta = inject(Meta)
  ngOnInit(): void {
    this.title.setTitle('Доставка еды в Дербенте - заказать онлайн | My-City');  
    this.meta.addTag({ name: 'description', content: 'Доставка еды в Дербенте - заказать онлайн | My-City' });
    this.meta.addTag({name:'keywords',content:'доставка еды в дербенте,заказ еды дербент,заказать еду дербент,доставка еды,заказ еды,заказать еду'});
  }
}
