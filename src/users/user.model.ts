import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  rating: {
    type:Number,
    default: 0
  },
  address_01:{
    type:String,
    required:true
  },
  address_02:{
    type:String,
    required:false
  },
  country:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  zip_code:{
    type:String,
    required:true
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  kyc:{
    verified:{
      type:Boolean,
      default:false
    },
    data:[{
      type:mongoose.Schema.Types.ObjectId,
      required:false
    }]
  }
});


export interface User extends mongoose.Document{
  first_name: string;
  last_name: string;
  nic: string;
  rating: number;
  address_01: string;
  address_02?: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  mobile: string;
  email: string;
  password: string;
  kyc: {
    verified: boolean;
    data?:[mongoose.Schema.Types.ObjectId];
  };
}