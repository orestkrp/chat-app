import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from '../shemas/conversation.scheme';
import { Repository } from 'src/database/repository';

export class ConversationsRepository extends Repository<Conversation> {
  protected readonly logger: Logger = new Logger(Conversation.name);

  constructor(
    @InjectModel(Conversation.name) conversationModel: Model<Conversation>,
  ) {
    super(conversationModel);
  }
}
