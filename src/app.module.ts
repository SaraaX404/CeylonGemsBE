import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BidsModule } from './bids/bids.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PhotosModule } from './photos/photos.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, BidsModule, MongooseModule.forRoot(process.env.MONGO_URI), AuthModule, PostsModule, PhotosModule, MulterModule.register({ dest: './uploads' })],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
