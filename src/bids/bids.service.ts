import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Bids } from './bids.model';

@Injectable()
export class BidsService {
    constructor(@InjectModel('Bids') private readonly PostsModel: Model<Bids>) {}

    create(data:Omit<Bids, 'buyerId'>, id:mongoose.Schema.Types.ObjectId){
       return this.PostsModel.create({
        ...data,
        buyerId:id
       })
    }
    async getAll():Promise<Bids[]>{
        return await this.PostsModel.find({})
    }


    getById(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.findById(id)
    }

    getBySeller(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find().populate({'path':'postID',match:{seller_id:id}})
    }

    getByPost(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find({postID:id})
    }

    getByBuyer(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find({buyerId:id})
    }
}
