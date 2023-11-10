import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { photosSchema } from './photos.model';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{name:'Photos', schema:photosSchema}]),MulterModule.register({ dest: './uploads' })],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
