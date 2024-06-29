import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../shemas/user.scheme';
import { AuthService } from './auth.service';
import {
  RefreshTockenSchema,
  RefreshToken,
} from '../shemas/refresh-token.scheme';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { ResetTockenSchema, ResetToken } from '../shemas/reset-token.scheme';
import { RefreshTokenRepository } from './refresh-token.repository copy';
import { ResetTokenRepository } from './reset-token.repository';
import { MailService } from './mail.service';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTockenSchema },
      { name: ResetToken.name, schema: ResetTockenSchema },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenRepository,
    ResetTokenRepository,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
