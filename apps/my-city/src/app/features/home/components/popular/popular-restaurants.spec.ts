import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularRestaurants } from './popular-restaurants';

describe('PopularRestaurants', () => {
  let component: PopularRestaurants;
  let fixture: ComponentFixture<PopularRestaurants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularRestaurants],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularRestaurants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
