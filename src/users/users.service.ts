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
    first_name: string,
  last_name: string,
  nic: string,
  rating: number,
  address_01: string,
  address_02:string | null = null,
  country: string,
  state: string,
  city: string,
  zip_code: string,
  mobile: string,
  email: string,
  password: string,
 
  ) {
    const salt = 10

    const hash = await bcrypt.hash(password, salt)

    const user = await this.UsersModel.create({first_name, last_name, nic, rating, address_01, address_02, country, state, city, zip_code, email,mobile, password:hash})

    return user



  }
}
