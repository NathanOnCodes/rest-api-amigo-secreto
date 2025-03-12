import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants/constants';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @Public()
    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // async signIn(@Body() auth: AuthDto){
    //     return await this.authService.signIn(auth.email);
    // }
}
