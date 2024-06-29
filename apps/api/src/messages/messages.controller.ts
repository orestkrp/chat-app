import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import { AuthGuard } from '../guards/auth.guard.ts';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Message } from 'src/shemas/message.scheme';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get messages by conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved messages',
    type: [Message],
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @Get()
  async getConversationMessages(
    @Query('conversation_id') conversationId: string,
  ) {
    return await this.messagesService.getConversationMessages(conversationId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateMessageDTO })
  @ApiResponse({
    status: 201,
    description: 'Successfully created message',
    type: Message,
  })
  @Post()
  async createMessage(
    @Body() { body, conversationId }: CreateMessageDTO,
    @Request() request,
  ) {
    return await this.messagesService.createMessage(
      body,
      conversationId,
      request.user.id,
    );
  }
}
