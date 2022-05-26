import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: AuthModule.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  static jwtSecret: string;

  constructor(private configService: ConfigService) {
    AuthModule.jwtSecret = this.configService.get('JWT_SECRET');
  }
}
