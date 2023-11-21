import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AuctionItem, Bids } from './bids.model';
import { Posts } from 'src/posts/posts.model';

@Injectable()
export class BidsService {
    constructor(@InjectModel('Bids') private readonly BidsModel: Model<Bids>, @InjectModel('Posts') private readonly PostsModel:Model<Posts>) {}

    async create(data:Omit<Bids, 'buyerId'>, id:mongoose.Schema.Types.ObjectId){


       const post = await this.PostsModel.findById(data.postID)
       if(post.highestPrice < data.price){
        await this.PostsModel.findByIdAndUpdate(data.postID, {highestPrice:data.price})
       }

       return this.BidsModel.create({
        ...data,
        buyerId:id
       })



    }
    async getAll():Promise<Bids[]>{
        return await this.BidsModel.find({})
    }


    getById(id:mongoose.Schema.Types.ObjectId){
        return this.BidsModel.findById(id)
    }

    async getBySeller(id: mongoose.Schema.Types.ObjectId) {
        try {
          let res = await this.BidsModel.find()
            .populate({
              path: 'postID',
              match: { seller_id: id },
              populate: { path: 'photos' } // Populate the 'photos' array within 'postID'
            })
            .exec();
      
          return res;
        } catch (error) {
          // Handle error appropriately
          console.error(error);
          throw error;
        }
      }

    getByPost(id:mongoose.Schema.Types.ObjectId){
        return this.BidsModel.find({postID:id})
    }

    getByBuyer(id:mongoose.Schema.Types.ObjectId){
        return this.BidsModel.find({buyerId:id})
    }
}
