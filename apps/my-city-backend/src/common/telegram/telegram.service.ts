import { OrderEntity } from '@my-city/entities';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TelegramService {
  private readonly token = process.env.TG_BOT_TOKEN;

  async sendMessage(chatId: string, text: string) {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });
  }
  buildOrderMessage(order: OrderEntity) {
    const items = order.items
      .map((i) => `• ${i.name} × ${i.quantity} = ${i.price * i.quantity} ₽`)
      .join('\n');

    return `
<b>🛒 Новый заказ</b>

${items}

<b>Итого:</b> ${order.totalPrice} ₽
<b>Статус:</b> ${order.status}
`;
  }
}
