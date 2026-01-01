import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactEmail(contact: ContactDto) {
    await this.transporter.sendMail({
      from: `"My City" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `Новое сообщение от ${contact.name}`,
      html: `
        <p><strong>Имя:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Телефон:</strong> ${contact.phone || 'Не указан'}</p>
        <p><strong>Сообщение:</strong><br/>${contact.message}</p>
      `,
    });
  }
}