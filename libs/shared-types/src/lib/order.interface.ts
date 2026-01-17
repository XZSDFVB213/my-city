export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;

  items: OrderItem[];
  totalPrice: number;

  status: 'pending' | 'confirmed' | 'completed';

  createdAt: string;
  orderType : 'Доставка' | 'Самовывоз' | 'В ресторане';
  tableId?:string
  phoneNumber?: string
}
