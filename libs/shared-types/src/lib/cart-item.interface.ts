export interface CartItem {
  dishId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}
export interface Cart {
  restaurantId: string
  items: CartItem[]
  totalPrice: number
}
