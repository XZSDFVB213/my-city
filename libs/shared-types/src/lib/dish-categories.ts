export const DISH_CATEGORIES = [
  'Кофе',
  'Чай',
  'Завтраки',
  'Супы',
  'Горячее',
  'Пицца',
  'Бургеры',
  'Шашлык',
  'Чуду',
  'Салаты',
  'Десерты',
  'Напитки',
  'Суши',
  'Другое',
  'Вегетарианское',
  'Роллы',
] as const;
export type DishCategory = typeof DISH_CATEGORIES[number]