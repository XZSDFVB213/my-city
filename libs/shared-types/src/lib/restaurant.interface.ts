export interface Restaurant {
  id: string;
  slug: string;           // my-city/djumeirah
  name: string;
  cuisine: string;
  description?: string;
  isActive: boolean;
  telegramUsername?: string| null;
  telegramChatId?: string | null;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
