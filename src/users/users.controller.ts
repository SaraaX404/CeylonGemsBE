import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post()
    login():string{
        return "Login User"
    }

    @Post()
    register():string{
        return "Register User"
    }
}
