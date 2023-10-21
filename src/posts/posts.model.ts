
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
        type: String,
        required: true,
      }],
    start_price: {
      type: Number,
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  export interface Posts extends Document {
    name: string;
    description: string;
    start_price: number;
    seller_id: Types.ObjectId;
    photos: string[4];
    status?: 'PENDING' | 'OPEN' | 'CLOSED';
  }
