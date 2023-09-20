import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";


@Module({
  providers: [AuthService, LocalStrategy, JwtService, JwtStrategy],
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:'NOBODY DOES IT BETTER',
    signOptions:{expiresIn:'3600s'}
  })],
  exports:[AuthService]
})
export class AuthModule {}
