import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('posts')
export class PostsController {
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(){
        return []
    }
}
