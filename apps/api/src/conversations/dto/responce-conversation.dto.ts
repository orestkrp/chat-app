import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ResponceConversationDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'Conversation ID',
  })
  id: string;

  @ApiProperty({
    example: 'General Chat',
    description: 'Name of the conversation',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: '2024-06-25T08:40:30.236Z',
    description: 'Timestamp of the last message',
    required: false,
  })
  lastMessageAt?: Date;

  @ApiProperty({
    example: true,
    description: 'Indicates if the conversation is a group chat',
  })
  isGroup: boolean;

  @ApiProperty({ type: [String], description: 'Array of participant IDs' })
  participants: Types.ObjectId[];
}
