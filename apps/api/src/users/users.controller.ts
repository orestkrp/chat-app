import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.secvice';
import { AuthGuard } from 'src/guards/auth.guard.ts';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/shemas/user.scheme';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user',
    type: User,
  })
  @Get(':id')
  @ApiResponse({ status: 404, description: 'User not found', type: GetUserDto })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users',
    type: [GetUserDto],
  })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAvatarDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Avatar uploaded successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.id;
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const avatarUrl = uploadResult.secure_url;
    await this.usersService.updateAvatar(userId, avatarUrl);
    return { url: avatarUrl };
  }
}
