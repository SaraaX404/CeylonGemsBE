import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly PostsModel: Model<Posts>) {}

    create(data:Posts){
       return this.PostsModel.create(data)
    }

    getAll(){
        return this.PostsModel.find({});
    }


}
