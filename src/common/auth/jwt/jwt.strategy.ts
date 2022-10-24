import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as requestIp from 'request-ip';

import { AuthService } from '@app/auth/auth.service';
import { Request } from 'express';

export type JwtData = {
  id: string;
  user_agent: string;
  ip: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') || 'secret',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<JwtData> {
    const id = payload.sub;
    const userExists = await this.authService.validateUser(id);
    if (!userExists) {
      throw new UnauthorizedException();
    }

    return {
      id,
      user_agent: request.headers['user-agent'],
      ip: requestIp.getClientIp(request),
    };
  }
}
