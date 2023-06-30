import * as mongoose from 'mongoose';

export const BidsSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['ACCEPTED', 'REJECTED', 'IN_REVIEW'],
  },
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  price: {
    type: Number,
    required: true,
  },
});
