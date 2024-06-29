import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDTO } from './dto/create-coversation.dto';
import { ConversationsRepository } from './conversations.repository';
import { Types } from 'mongoose';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversaionsRepository: ConversationsRepository,
  ) {}

  async createConversation(dto: CreateConversationDTO, userId: Types.ObjectId) {
    const participants = [...dto.participants, userId];
    return await this.conversaionsRepository.create({ ...dto, participants });
  }

  async getUserConversations(userId: Types.ObjectId) {
    return await this.conversaionsRepository.find({ participants: userId });
  }

  async deleteConversation(id: string) {
    const deletedConversation = this.conversaionsRepository.findOneAndDelete({
      _id: id,
    });

    if (!deletedConversation) {
      throw new NotFoundException('Conversaion is not found');
    }

    return deletedConversation;
  }
}
