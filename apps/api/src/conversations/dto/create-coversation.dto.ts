import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateConversationDTO {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsBoolean()
  @ApiProperty()
  isGroup: boolean;

  @IsArray()
  @ApiProperty()
  participants: Types.ObjectId[];
}
