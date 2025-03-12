import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { HashService } from './hash/hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
    ) {}


    async login(loginDto: LoginDto){
        const user = await this.userRepository.findOne({where: {email: loginDto.email}});
        if(!user) throw new UnauthorizedException();

        const passwordValidate = await this.hashService.compare(loginDto.password, user.password);
        if(!passwordValidate) throw new UnauthorizedException();

        return this.createTokens(user);
    }

    private async createTokens(user: User){
        const accessTokenPromise = this.signJwtAsync<Partial<User>>(
            user.id,
            this.jwtConfiguration.jwtTtl,
            { email: user.email },
          );
      
          const refreshTokenPromise = this.signJwtAsync(
            user.id,
            this.jwtConfiguration.jwtRefreshTtl,
          );
      
          const [accessToken, refreshToken] = await Promise.all([
            accessTokenPromise,
            refreshTokenPromise,
          ]);
      
          return {
            accessToken,
            refreshToken,
          };
    }

    private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T){
        return  this.jwtService.signAsync(
            {
                sub,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        );
    }
}
