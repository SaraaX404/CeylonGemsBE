import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UsersModel: Model<User>) {}

  async getAll() {
    const users = await this.UsersModel.find({});
    return users;
  }

  async getByUserName(username:string){

    const user = await this.UsersModel.findOne({email:username})
    console.log(user, "user")
    return user
  }

  async getUserById(id:mongoose.Schema.Types.ObjectId){
    const user = await this.UsersModel.findById(id)
    return user
  }



  async register(
    name: string,
    nic: string,

    mobile: string,
    email: string,
    password: string,
    kyc:string
  ) {

    const salt = 10

    console.log(salt)

    const hash = await bcrypt.hash(password, salt)

    console.log(hash)
    const user = await this.UsersModel.create({name,nic,mobile,email,password:hash, kyc:{data:kyc}})

    console.log(user)
    return user



  }
}
