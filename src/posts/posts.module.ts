import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './posts.model';
import { BidsService } from 'src/bids/bids.service';
import { BidsSchema } from 'src/bids/bids.model';

@Module({
  providers: [PostsService, JwtAuthGuard, BidsService],
  imports: [MongooseModule.forFeature([{name:'Posts', schema:PostSchema},{name:'Bids', schema:BidsSchema}])],
  controllers: [PostsController]
})
export class PostsModule {}
