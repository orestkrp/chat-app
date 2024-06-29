import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Message } from '../shemas/message.scheme';
import { Repository } from 'src/database/repository';

@Injectable()
export class MessagesRepository extends Repository<Message> {
  constructor(@InjectModel(Message.name) messageModel: Model<Message>) {
    super(messageModel);
  }
}
