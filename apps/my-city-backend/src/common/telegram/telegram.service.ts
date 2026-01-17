import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OrderEntity } from '@my-city/entities';

@Injectable()
export class TelegramService {
  private readonly token = process.env.TG_BOT_TOKEN;

  async sendMessage(chatId: string, text: string) {
    if (!this.token) {
      console.error('TG_BOT_TOKEN not set');
      return;
    }

    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      });
    } catch (error) {
      console.error(
        'Telegram sendMessage error:',
        error?.response?.data || error.message,
      );
    }
  }

  buildOrderMessage(order: OrderEntity) {
  const items = order.items
    .map(
      (i) => `• ${i.name} × ${i.quantity} = ${i.price * i.quantity} ₽`
    )
    .join('\n');

  const tableLine = order.tableId
    ? `🪑 <b>Столик:</b> ${order.tableId.replace('table-', '')}\n`
    : '';
  const tableLine2 = order.phoneNumber
    ? `📞 <b>Телефон:</b> ${order.phoneNumber}\n`: '';
  return `
    <b>🛒 Новый заказ</b>
  ${tableLine}
  ${tableLine2}
  ${items}
    <b>Итого:</b> ${order.totalPrice} ₽
    <b>Тип:</b> ${order.orderType}
  `;
}
}
