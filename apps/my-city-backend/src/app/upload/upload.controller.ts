import { Controller, UseGuards,UseInterceptors, Post, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../auth/auth.guard';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}
    @UseGuards(AdminGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
}
}
