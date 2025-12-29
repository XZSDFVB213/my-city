export interface Dish {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  restaurantId: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}