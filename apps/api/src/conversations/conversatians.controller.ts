import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDTO } from './dto/create-coversation.dto';
import { AuthGuard } from '../guards/auth.guard.ts';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Conversation } from 'src/shemas/conversation.scheme';
import { ResponceConversationDto } from './dto/responce-conversation.dto';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private conversationService: ConversationsService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateConversationDTO })
  @ApiResponse({
    status: 201,
    description: 'Successfully created conversation',
    type: Conversation,
  })
  @Post()
  async createConversation(
    @Body() dto: CreateConversationDTO,
    @Request() request,
  ) {
    return await this.conversationService.createConversation(
      dto,
      request.user.id,
    );
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get conversations for a user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved conversations',
    type: [ResponceConversationDto],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get()
  async getUserConversations(@Req() req) {
    return await this.conversationService.getUserConversations(req.user.id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user conversation' })
  @ApiResponse({
    status: 200,
    description: 'Conversation was deleted',
    type: ResponceConversationDto,
  })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @Delete(':id')
  async deleteConversation(@Param('id') id: string) {
    return await this.conversationService.deleteConversation(id);
  }
}
