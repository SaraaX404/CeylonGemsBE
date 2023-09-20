import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
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
    data:{
      type:String,
      required:true
    }
  }
});


export interface User extends mongoose.Document{
  id:string;
  name:string;
  nic:string;
  type:string;
  mobile:string;
  email:string;
  password:string;
  kyc:{
    verified:boolean,
    data:string
  };
}