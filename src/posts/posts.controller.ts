import {Controller, Get,Post, UseGuards, Body, Param, Request} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService){}


    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() body:Omit<Posts,'seller_id'>, @Request() req){
        const postData:Posts = {
            ...body,
            seller_id:req.user._id
        }

        return this.postsService.create(postData)
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(){
        return this.postsService.getAll()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id){
        console.log(id)
        return this.postsService.getById(id)
    }

}
