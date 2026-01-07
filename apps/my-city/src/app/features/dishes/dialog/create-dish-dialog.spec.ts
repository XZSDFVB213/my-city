import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDishDialog } from './create-dish-dialog';

describe('CreateDishDialog', () => {
  let component: CreateDishDialog;
  let fixture: ComponentFixture<CreateDishDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDishDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDishDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
