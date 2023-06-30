import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  priceRange: {
    startPrice: {
      type: Number,
      required: false,
    },
    endPrice: {
      type: Number,
      required: false,
    },
  },
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED', 'IN_REVIEW'],
  },
});
