import { Controller, Post, Get, Body,Request,UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import * as mongoose from "mongoose";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";

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
      name: string;
      nic: string;
      mobile: string;
      email: string;
      password: string;
      kyc:string;
    },
  ) {
    console.log(body)
    const user = await this.userService.register(
      body.name,
      body.nic,
      body.mobile,
      body.email,
      body.password,
        body.kyc
    );

    console.log(user)

    return user
  }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req){
        return this.authService.genToken(req.user)
    }
}
