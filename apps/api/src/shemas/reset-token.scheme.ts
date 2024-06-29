import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { DatabaseDocument } from 'src/database/schema';

export type ConversationDocument = HydratedDocument<ResetToken>;

@Schema({ timestamps: true, versionKey: false })
export class ResetToken extends DatabaseDocument {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  expiryDate: Date;
}

export const ResetTockenSchema = SchemaFactory.createForClass(ResetToken);
