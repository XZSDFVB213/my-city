export interface Restaurant {
  id: string;
  slug: string;           // my-city/djumeirah
  name: string;
  cuisine: string;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
