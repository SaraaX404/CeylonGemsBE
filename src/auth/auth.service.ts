import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt'
import {User} from "../users/user.model";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private authService:UsersService, private jwtService:JwtService) {
    }

    async login(username:string, pwd:string){
        const user = await this.authService.getByUserName(username)
        console.log(user)
        if(!user){
            return null
        }

        if(! await bcrypt.compare(pwd, user.password)){
            return null
        }


        return user
    }

    async genToken(user:User):Promise<string>{
        const payload = {id:user.id, name:user.first_name}
        const token = this.jwtService.sign(payload, {secret:"NOBODY DOES IT BETTER"})
        return token
    }
}
