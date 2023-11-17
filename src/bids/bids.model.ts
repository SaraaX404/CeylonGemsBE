import * as mongoose from 'mongoose';
import { Posts } from 'src/posts/posts.model';

export const BidsSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
    default:'PENDING'
  },
  buyerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
  },
  price: {
    type: Number,
    required: true,
  },
});

export interface Bids extends Document {
  status:'ACCEPTED' | 'REJECTED' | 'PENDING',
  buyerId: mongoose.Schema.Types.ObjectId,
  postID: mongoose.Schema.Types.ObjectId,
  price: number
}

export type AuctionItem = Omit<Bids, 'postID'> & {
  postID:Posts
}

