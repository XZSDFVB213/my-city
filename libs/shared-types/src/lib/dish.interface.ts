import { DishCategory } from "./dish-categories";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  restaurantId: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: DishCategory;

}