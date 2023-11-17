
import mongoose, { Types } from "mongoose";

export const PostSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'OPEN', 'CLOSED'],
        default: 'PENDING',
      },
    photos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Photos',
        required:false
      }],
    start_price: {
      type: Number,
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    fixed:{
      type:Boolean,
      default:false
    },
    highestPrice:{
      type:Number,
      default:0
    },
    end_date:{
      type:Date,
      required:false
    }
  });

  export interface Posts extends Document {
    name: string;
    description: string;
    start_price: number;
    highestPrice: number;
    seller_id: Types.ObjectId;
    photos: mongoose.Schema.Types.ObjectId[];
    status?: 'PENDING' | 'OPEN' | 'CLOSED';
    fixed?:boolean,
    end_date?:Date
  }
