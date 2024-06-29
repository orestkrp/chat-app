import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class GetUserDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'john_doe@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'User profile image',
    required: false,
  })
  image?: string;

  @ApiProperty({
    type: [String],
    description: 'Array of conversation IDs',
    required: false,
  })
  conversations?: Types.ObjectId[];
}
