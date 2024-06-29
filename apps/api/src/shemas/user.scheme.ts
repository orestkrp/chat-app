import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { DatabaseDocument } from 'src/database/schema';

export type ConversationDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User extends DatabaseDocument {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  image?: string;

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Conversation' }],
    required: true,
  })
  conversations?: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
