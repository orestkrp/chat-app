import { Module } from '@nestjs/common';
import { ConversationsModule } from './conversations/conversations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat-gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ConversationsModule,
    UsersModule,
    AuthModule,
    MessagesModule,
  ],
  providers: [ConfigService, ChatGateway],
  exports: [ConfigService],
})
export class ChatModule {}
