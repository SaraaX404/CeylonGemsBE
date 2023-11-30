import {Controller, Get,Post, UseGuards, Body, Param, Request, Put} from '@nestjs/common';
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

    @Get('/pending')
    getPending(){
        return this.postsService.getPending()
    }

    @Get()
    //@UseGuards(JwtAuthGuard)
    getAll(){
        return this.postsService.getAll()
    }

    @Get('/approved')
    @UseGuards(JwtAuthGuard)
    getApproved(@Request() req){
        return this.postsService.getApproved(req.user._id)
    }


    @Get('/MyPosts')
    @UseGuards(JwtAuthGuard)
    getBySeller(@Request() req){

      return this.postsService.getBySeller(req.user._id)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id){
        console.log(id)
        return this.postsService.getById(id)
    }

    @Put('/UpdateStatus/:id')
    updateStatus(@Param('id') id, @Body() body){   
        return this.postsService.updateStatus(id, body)
    }

    

    

}
