import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRestaurantDialog } from './create-restaurant-dialog';

describe('CreateRestaurantDialog', () => {
  let component: CreateRestaurantDialog;
  let fixture: ComponentFixture<CreateRestaurantDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRestaurantDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
