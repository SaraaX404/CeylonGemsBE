import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Module({
  providers: [PostsService, JwtAuthGuard],
  controllers: [PostsController]
})
export class PostsModule {}
