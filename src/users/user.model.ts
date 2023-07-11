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
  type: {
    type: String,
    enum: ['SELLER', 'BUYER'],
    required: true,
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
});


export interface User extends mongoose.Document{
  id:string;
  name:string;
  nic:string;
  type:string;
  mobile:string;
  email:string;
  password:string;
}