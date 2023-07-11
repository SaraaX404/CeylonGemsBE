import { Controller, Post, Get, Body } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
      type: string;
      mobile: string;
      email: string;
      password: string;
    },
  ) {
    console.log(body)
    const user = await this.userService.register(
      body.name,
      body.nic,
      body.type,
      body.mobile,
      body.email,
      body.password,
    );

    console.log(user)

    return user
  }
}
