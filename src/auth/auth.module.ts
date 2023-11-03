
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './jwt.strategy';  
import { PassportModule } from '@nestjs/passport';  
import { JwtModule } from '@nestjs/jwt';  
import { RolesGuard } from 'src/tools/guards/roles.guards';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),  
    JwtModule.register({
      secret: 'clesecretedetest', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthRepository, JwtStrategy],  
  controllers: [AuthController],
})

export class AuthModule {}
