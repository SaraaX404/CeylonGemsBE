import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './photos.model';
import { firebaseApp } from 'firebase.service';

@Injectable()
export class PhotosService {
    constructor(@InjectModel('Photos') private readonly PhotosModel: Model<Photo>) {}

    async create(file:Express.Multer.File){

        const storage = firebaseApp.storage()
        const bucket = storage.bucket();

    

        const storageOptions = {
            destination: `photos/${file.originalname}`,
            metadata: {
                contentType: file.mimetype,
            },
        };

        try {
            const res= await bucket.upload(file.path, storageOptions);
            console.log(res);
            return 'File uploaded successfully';
        } catch (error) {
            console.error('Error uploading file to Firebase Storage:', error);
            throw new Error('Failed to upload file to Firebase Storage');
        }
        
    
        
        

    }
}
