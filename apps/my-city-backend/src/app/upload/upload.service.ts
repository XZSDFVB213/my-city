import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;
  constructor() {
    this.client = new S3Client({
      endpoint: process.env['AWS_S3_ENDPOINT'],
      credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      },
      region: process.env['AWS_REGION'],
    });
    this.bucket = process.env['AWS_BUCKET'];
    this.publicUrl = process.env['AWS_PUBLIC_URL'];
  }

  

  async deleteFile(fileName: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      }),
    );
  }
 async uploadFile(file: Express.Multer.File, oldUrl?: string) {
  // Удаляем старый файл, если есть
  if (oldUrl) {
    const oldKey = oldUrl.split('/').pop();
    if (oldKey) {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: oldKey,
        }),
      );
    }
  }

  // Загружаем новый файл
  const ext = file.originalname.split('.').pop();
  const fileName = `${randomUUID()}.${ext}`;

  await this.client.send(
    new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }),
  );

  return {
    url: `${this.publicUrl}/${fileName}`,
  };
}
}
