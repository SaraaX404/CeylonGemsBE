import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('bids')
export class BidsController {

    @Get()
    get():string{
        return "Get All Bids"
    }

    @Get(':id')
    getById(@Param('id') bidID:string):string{
        return `Get Bids by ${bidID}`
    }

    @Post()
    create(): string{
        return "Create Bid"
    }

    @Patch()
    update(@Param('id') bidID:string): string{
        return `Update Bid by ${bidID}`
    }

    @Delete(':id')
    delete(@Param('id') bidID:string){
        return `Delete Bid by ${bidID}`
    }
}
