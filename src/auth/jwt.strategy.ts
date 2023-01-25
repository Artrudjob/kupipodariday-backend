import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {ExtractJwt} from "passport-jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY
        });
    }

    async validate(jwtPayload: { sub: number }) {
        const user = this.usersService.findOne(jwtPayload.sub)

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
