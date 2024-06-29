import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMessageDTO {
  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  senderId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  conversationId: Types.ObjectId;
}
