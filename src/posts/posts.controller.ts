import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    @Get()
    get():string{
        return "Get All Posts"
    }

    @Get(':id')
    getById(@Param('id') prodID:string):string{
        console.log(prodID)
        return `Get Posts by ${prodID}`
    }

    @Post()
    create(): string{
        return "Create Post"
    }

    @Patch()
    update(@Param(':id') prodID:string): string{
        return `Update Post by ${prodID}`
    }

    @Delete(':id')
    delete(@Param('id') prodID:string){
        return `Delete Post by ${prodID}`
    }
}
