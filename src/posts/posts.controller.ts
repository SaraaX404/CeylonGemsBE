import {Controller, Get,Post, UseGuards, Body} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService){}


    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() body:Posts){
        return this.postsService.create(body)
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(){
        return this.postsService.getAll()
    }

}
