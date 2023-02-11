import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @UseGuards(LocalGuard)
    @Post('signin')
    signin(@Req() req, @Res() res: Response) {
        res.status(200).cookie('access_token', this.authService.auth(req.user), { httpOnly: true })
            .send({ 'signin': true });
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const user = await this.usersService.create(createUserDto);
        res.status(200).cookie('access_token', this.authService.auth(user), { httpOnly: true })
            .send({ 'signup': true });
    }
}
