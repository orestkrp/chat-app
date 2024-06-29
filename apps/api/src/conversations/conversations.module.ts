import { Module } from '@nestjs/common';
import { ConversationsController } from './conversatians.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsService } from './conversations.service';
import { ConversationsRepository } from './conversations.repository';
import { JwtService } from '@nestjs/jwt';
import {
  Conversation,
  ConversationSchema,
} from 'src/shemas/conversation.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsRepository, ConversationsService, JwtService],
})
export class ConversationsModule {}
