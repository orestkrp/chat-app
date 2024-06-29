import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { DatabaseDocument } from 'src/database/schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true, versionKey: false })
export class Message extends DatabaseDocument {
  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  conversationId: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], required: true })
  seenIds: Types.ObjectId[];
}
export const MessageSchema = SchemaFactory.createForClass(Message);
