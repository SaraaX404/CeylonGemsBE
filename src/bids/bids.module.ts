import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { BidsSchema } from './bids.model';

@Module({
  providers: [JwtAuthGuard,BidsService],
  imports: [MongooseModule.forFeature([{name:'Bids', schema:BidsSchema}])],
  controllers: [BidsController]
})
export class BidsModule {}
