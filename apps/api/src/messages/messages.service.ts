import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}
  async getConversationMessages(conversationId: string) {
    return await this.messagesRepository.findAllSortedByCreatedAt(
      {
        conversationId,
      },
      'desc',
    );
  }

  async createMessage(
    body: string,
    conversationId: Types.ObjectId,
    senderId: Types.ObjectId,
  ) {
    return await this.messagesRepository.create({
      body,
      conversationId,
      senderId,
      seenIds: [senderId],
    });
  }
}
