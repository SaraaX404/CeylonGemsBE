import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Bids } from './bids.model';

@Controller('bids')
export class BidsController {

    constructor(private readonly bidsService: BidsService){}


    @Get()
    async get(){
        const bids:Bids[] = await this.bidsService.getAll()
        return bids
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
