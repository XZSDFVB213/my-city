import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    async uploadFile (file: Express.Multer.File) {
        const ext = file.originalname.split('.').pop();
        const fileName = `$randomUUID.${ext}`
        return {
            url:`https://fake-cdn.my-city.app/${fileName}`,
        }
    }
}
