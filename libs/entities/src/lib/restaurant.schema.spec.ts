import { RestaurantEntity } from './restaurant.schema';
import '@types/jest';
describe('RestaurantEntity', () => {
  it('should work', () => {
    expect(new RestaurantEntity()).toEqual('RestaurantEntity');
  });
});
