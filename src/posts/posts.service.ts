import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts } from './posts.model';
import { BidsService } from 'src/bids/bids.service';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly PostsModel: Model<Posts>, private readonly bidsService: BidsService) {}

    create(data:Posts){
       return this.PostsModel.create(data)
    }

    getAll(){
        return this.PostsModel.find({}).populate('photos seller_id');
    }

    async getApproved(id:mongoose.Types.ObjectId){
        return this.PostsModel.find({ status: 'OPEN', seller_id: { $ne: id } }).populate('photos seller_id');
    }

    getById(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.findById(id).populate('photos seller_id')
    }

    getBySeller(id:mongoose.Schema.Types.ObjectId){
        return this.PostsModel.find({seller_id:id}).populate('photos')
    }

    getPending(){
        return this.PostsModel.find({status:'PENDING'}).populate('photos seller_id')
    }

    async updateStatus(id, data){
        let post = await this.PostsModel.findById(id)

        console.log(data)
        console.log(post)

        if(data.status == 'CLOSED'){
            let bids = await this.bidsService.getByPost(id)
            console.log(bids)
            bids.forEach(async(element) => {
                let status:'ACCEPTED'|'REJECTED' = element.price == post.highestPrice ? 'ACCEPTED' :'REJECTED'
                console.log(status)
                await this.bidsService.updateStatus(element._id, {status})
            });
        }

        return this.PostsModel.findByIdAndUpdate(id, {status:data.status})
    }


}
