import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UsersModel: Model<User>) {}

  async getAll() {
    const users = await this.UsersModel.find({});
    return users;
  }

  async register(
    name: string,
    nic: string,
    type: string,
    mobile: string,
    email: string,
    password: string,
  ) {

    const salt = 10

    console.log(salt)

    const hash = await bcrypt.hash(password, salt)

    console.log(hash)
    const user = await this.UsersModel.create({name,nic,type,mobile,email,password:hash})

    console.log(user)
    return user



  }
}
