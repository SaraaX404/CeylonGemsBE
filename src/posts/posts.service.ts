import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly PostsModel: Model<Posts>) {}

    create(data:Posts){
       return this.PostsModel.create(data)
    }

    getAll(){
        return this.PostsModel.find({}).populate('photos seller_id');
    }

    getById(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.findById(id).populate('photos seller_id')
    }

    getBySeller(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find({seller_id:id}).populate('photos')
    }


}
