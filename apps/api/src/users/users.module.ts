import { Module } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.secvice';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user.scheme';
import { DatabaseModule } from 'src/database/database.module';
import { AuthGuard } from 'src/guards/auth.guard.ts';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersRepository,
    UsersService,
    AuthGuard,
    JwtService,
    CloudinaryService,
  ],
  controllers: [UsersController],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
