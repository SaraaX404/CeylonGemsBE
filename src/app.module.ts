import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { BidsController } from './bids/bids.controller';
import { BidsService } from './bids/bids.service';
import { BidsModule } from './bids/bids.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PostsModule, BidsModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
