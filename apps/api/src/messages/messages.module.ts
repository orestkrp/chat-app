import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../shemas/message.scheme';
import { AuthGuard } from '../guards/auth.guard.ts';
import { JwtService } from '@nestjs/jwt';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [
    ConfigService,
    AuthGuard,
    JwtService,
    MessagesService,
    MessagesRepository,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
