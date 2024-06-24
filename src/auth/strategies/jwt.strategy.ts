import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserPayload): Promise<UserFromJwt> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException(
        'Token invalidado, por favor faça login novamente.',
      );
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
