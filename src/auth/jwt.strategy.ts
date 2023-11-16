import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt,Strategy} from "passport-jwt";
import {UsersService} from "../users/users.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class  JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService:UsersService) {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'NOBODY DOES IT BETTER',
            ignoreExpiration:false
        });
    }
    async validate(payload:any){
        const user = await this.userService.getUserById(payload.id)
        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}