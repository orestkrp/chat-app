import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DatabaseDocument {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  _id: Types.ObjectId;
}
