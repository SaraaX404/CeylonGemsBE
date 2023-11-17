import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Bids } from './bids.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    create(@Body() body, @Request() req){
        return this.bidsService.create(body, req.user._id)
    }
    @Patch()
    update(@Param('id') bidID:string): string{
        return `Update Bid by ${bidID}`
    }
    @Delete(':id')
    delete(@Param('id') bidID:string){
        return `Delete Bid by ${bidID}`
    }

    @Get('/seller/:id')
    async getBySeller(@Param('id') id){
        const bit  =await this.bidsService.getBySeller(id)
        return bit
    }

    @Get('/buyer/:id')
    getByBuyer(@Param('id') id){
        return this.bidsService.getByBuyer(id)
    }

    @Get('/post/:id')
    getByPost(@Param('id') id){
        return this.bidsService.getByBuyer(id)
    }


}
