import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { Bids } from 'src/bids/bids.model';
import { Posts } from 'src/posts/posts.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UsersModel: Model<User>,@InjectModel('Bids') private readonly BidsModel: Model<Bids>,@InjectModel('Posts') private readonly PostsModel: Model<Posts>) {}

  async getAll() {
    const users = await this.UsersModel.find({});
    return users;
  }

  async getByUserName(username: string) {
    const user = await this.UsersModel.findOne({ email: username });
    console.log(user, 'user');
    return user;
  }

  async getUserById(id: mongoose.Schema.Types.ObjectId) {
    const user = await this.UsersModel.findById(id);
    return user;
  }

  async getStatus(){
    const users = await this.UsersModel.count()
    const bids = await this.BidsModel.count()
    const posts = await this.PostsModel.count()
    const pendingPosts = await this.PostsModel.find({status:"PENDING"}).count()

    return{
      users,bids,posts,pendingPosts
    }
  }

  async addKycByUserId(
    id: mongoose.Schema.Types.ObjectId,
    data: mongoose.Schema.Types.ObjectId[],
  ) {
    return await this.UsersModel.findByIdAndUpdate(id, {kyc:{data:data}}, {new:true})
  }

  async getKycRequests() {
    return (await this.UsersModel.find().populate('kyc.data')).filter((x)=> x.kyc.data.length > 0 && x.kyc.verified === false);
  }

  async updateStatus(id:string, data:any){

    let obj:{verified:boolean, data:mongoose.Schema.Types.ObjectId[]} = {} as {verified:boolean, data:mongoose.Schema.Types.ObjectId[]}

    let user = await this.UsersModel.findById(id)

    console.log(data)

    if(data.verified){
      obj.verified = data.verified
      obj.data = user.kyc.data
    }else{
      if(data.data){
        obj.data = data.data
      }
    }

  

    return this.UsersModel.findByIdAndUpdate(id, {kyc:obj}, {new:true})
  }

  async register(
    first_name: string,
    last_name: string,
    nic: string,
    rating: number,
    address_01: string,
    address_02: string | null = null,
    country: string,
    state: string,
    city: string,
    zip_code: string,
    mobile: string,
    email: string,
    password: string,
  ) {
    const salt = 10;

    const hash = await bcrypt.hash(password, salt);

    const user = await this.UsersModel.create({
      first_name,
      last_name,
      nic,
      rating,
      address_01,
      address_02,
      country,
      state,
      city,
      zip_code,
      email,
      mobile,
      password: hash,
    });

    return user;
  }
}
