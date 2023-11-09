import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Bids } from './bids.model';

@Injectable()
export class BidsService {
    constructor(@InjectModel('Bids') private readonly PostsModel: Model<Bids>) {}

    create(data:Bids){
       return this.PostsModel.create(data)
    }

    async getAll():Promise<Bids[]>{
        return await this.PostsModel.find({})
    }

    getById(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.findById(id)
    }

    getByBuyer(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find({sellerId:id})
    }

    getBySeller(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find().populate({'path':'postID',match:{seller_id:id}})
    }


}
