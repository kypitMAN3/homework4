import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/users.model';
import { Response } from 'express'

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('PROFILE') private profileClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    ) {}
  
    async login(user: User, response: Response) {
      const tokenPayload: TokenPayload = {
        userId: user.id.toString(16),
      };
  
      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
      );
  
      const token = this.jwtService.sign(tokenPayload);
  
      response.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });
    }
  
    logout(response: Response) {
      response.cookie('Authentication', '', {
        httpOnly: true,
        expires: new Date(),
      });
    }
}
