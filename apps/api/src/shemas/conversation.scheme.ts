import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  HydratedDocument,
  Schema as SchemaMongoose,
  SchemaTypes,
  Types,
} from 'mongoose';
import { DatabaseDocument } from 'src/database/schema';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true, versionKey: false })
export class Conversation extends DatabaseDocument {
  @Prop()
  name?: string;

  @Prop()
  lastMessageAt?: SchemaMongoose.Types.Date;

  @Prop({ required: true })
  isGroup: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
