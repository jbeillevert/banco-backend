import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'clesecretedetest', 
    });
  }

  async validate(payload: any) {  
    console.log('JWT payload:', payload);
    const user = await this.authService.validateUserById(payload.userId)

    console.log('User retrieved from validateUserById:', user);
    
    

    if (!user) {
      throw new UnauthorizedException()
    }
    
    return user;
  }
}
