import { Controller, Post, Get, Body,Request,UseGuards, Patch, Param, Put } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import * as mongoose from "mongoose";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private authService:AuthService) {}

  @Get()
  async get() {
    const users = await this.userService.getAll();
    return users;
  }


  @Post()
  async register(
    @Body()
    body: {
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
    },
  ) {
  
    const user = await this.userService.register(
      body.first_name, body.last_name, body.nic, body.rating, body.address_01, body.address_02, body.country, body.state, body.city, body.zip_code, body.mobile, body.email, body.password
    );

    console.log(user)

    return user
  }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req){
      const token = await this.authService.genToken(req.user)
      return{
        token:token
      }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/Update')
    async addKyc(@Body() kyc:{data:mongoose.Schema.Types.ObjectId[]}, @Request() req){
      console.log(req.user)
      if(req.user._id){
        return this.userService.addKycByUserId(req.user._id, kyc.data)
      }
      
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getMe(@Request() req){
      return this.userService.getUserById(req.user._id)
    }
}
