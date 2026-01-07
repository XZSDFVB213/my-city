import { TestBed } from '@angular/core/testing';

import { RestaurantDetailService } from './restaurant-detail-service';

describe('RestaurantDetailService', () => {
  let service: RestaurantDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
