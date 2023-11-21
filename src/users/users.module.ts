import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {AuthService} from "../auth/auth.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import { BidsSchema } from 'src/bids/bids.model';
import { PostSchema } from 'src/posts/posts.model';

@Module({
    imports:[MongooseModule.forFeature([{name:'Users', schema:UserSchema}]),MongooseModule.forFeature([{name:'Bids', schema:BidsSchema}]),MongooseModule.forFeature([{name:'Posts', schema:PostSchema}]),JwtModule.register({
        secret:'NOBODY DOES IT BETTER',
        signOptions:{expiresIn:'60s'}
    })],
    controllers:[UsersController],
    providers:[UsersService,AuthService, JwtService],
    exports:[UsersService]
})
export class UsersModule {}
