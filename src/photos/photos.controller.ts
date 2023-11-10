import { Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './photos.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotosController {

    constructor(private readonly photosService: PhotosService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file:Express.Multer.File){

        console.log(file)

      return this.photosService.create(file)
       
    }

}
