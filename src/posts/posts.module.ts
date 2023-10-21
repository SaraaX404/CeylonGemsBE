import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './posts.model';

@Module({
  providers: [PostsService, JwtAuthGuard],
  imports: [MongooseModule.forFeature([{name:'Posts', schema:PostSchema}])],
  controllers: [PostsController]
})
export class PostsModule {}
